use anchor_spl::token::{self, Approve, Token, TokenAccount};
use mpl_token_metadata::{
    instruction::freeze_delegated_account,
    state::{Metadata, TokenMetadataAccount},
    ID as MetadataTokenId,
};
use solana_program::program::invoke_signed;

use crate::*;

#[derive(Accounts)]
pub struct StakeNft<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    //  Global pool stores admin address
    #[account(
        mut,
        seeds = [GLOBAL_AUTHORITY_SEED.as_ref()],
        bump
    )]
    pub global_pool: Account<'info, GlobalPool>,

    //  PDA that stores user's stake info
    #[account(
        mut,
        seeds = [user.key().as_ref(), USER_POOL_SEED.as_ref()],
        bump,
    )]
    pub user_pool: Account<'info, UserPool>,

    /// CHECK: This is not dangerous because we don't read or write from this account
    pub nft_mint: AccountInfo<'info>,

    /// CHECK: Manual validation
    #[account(owner = MetadataTokenId)]
    pub nft_edition: UncheckedAccount<'info>,

    #[account(
        mut,
        constraint = user_token_account.mint == nft_mint.key(),
        constraint = user_token_account.owner == *user.key,
        constraint = user_token_account.amount == 1,
    )]
    pub user_token_account: Account<'info, TokenAccount>,

    /// the mint metadata
    #[account(
        mut,
        constraint = mint_metadata.owner == &mpl_token_metadata::ID
    )]
    /// CHECK: This is not dangerous because we don't read or write from this account
    pub mint_metadata: AccountInfo<'info>,

    pub token_program: Program<'info, Token>,

    /// CHECK: This is not dangerous because we don't read or write from this account
    #[account(constraint = token_metadata_program.key == &mpl_token_metadata::ID)]
    pub token_metadata_program: AccountInfo<'info>,
}

impl StakeNft<'_> {
    pub fn process_instruction(ctx: &mut Context<Self>) -> Result<()> {
        let mint_metadata = &mut &ctx.accounts.mint_metadata;

        let (metadata, _) = Pubkey::find_program_address(
            &[
                mpl_token_metadata::state::PREFIX.as_bytes(),
                mpl_token_metadata::id().as_ref(),
                ctx.accounts.nft_mint.key().as_ref(),
            ],
            &mpl_token_metadata::id(),
        );
        require!(
            metadata == mint_metadata.key(),
            StakingError::InvalidMetadata
        );

        // Verify metadata is legit
        let nft_metadata = Metadata::from_account_info(mint_metadata)?;

        // Check if this NFT is the wanted collection and verified
        if let Some(creators) = nft_metadata.data.creators {
            let mut valid: u8 = 0;
            for creator in creators {
                if creator.address.to_string() == COLLECTION_ADDRESS && creator.verified == true {
                    valid = 1;
                    break;
                }
            }
            require!(valid == 1, StakingError::InvalidCollection);
        } else {
            return Err(error!(StakingError::MetadataCreatorParseError));
        };

        // Delegate the NFT account to the PDA
        let cpi_accounts = Approve {
            to: ctx.accounts.user_token_account.to_account_info(),
            delegate: ctx.accounts.global_pool.to_account_info(),
            authority: ctx.accounts.user.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_context = CpiContext::new(cpi_program, cpi_accounts);
        token::approve(cpi_context, 1)?;

        // Freeze delegated account
        let global_bump = *ctx.bumps.get("global_pool").unwrap();
        let seeds = &[GLOBAL_AUTHORITY_SEED.as_bytes(), &[global_bump]];
        let nft_mint = &ctx.accounts.nft_mint;

        invoke_signed(
            &freeze_delegated_account(
                mpl_token_metadata::ID,
                ctx.accounts.global_pool.key(),
                ctx.accounts.user_token_account.key(),
                ctx.accounts.nft_edition.key(),
                nft_mint.key(),
            ),
            &[
                ctx.accounts.global_pool.to_account_info().clone(),
                ctx.accounts.user_token_account.to_account_info(),
                ctx.accounts.nft_edition.to_account_info(),
                nft_mint.to_account_info(),
            ],
            &[seeds],
        )?;

        //  Add stake info in user pool
        let user_pool = &mut ctx.accounts.user_pool;

        user_pool.add_stake_info(nft_mint.key())
    }
}
