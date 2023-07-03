use anchor_spl::token::{Token, TokenAccount};
use mpl_token_metadata::{instruction::thaw_delegated_account, ID as MetadataTokenId};
use solana_program::program::invoke_signed;

use crate::*;

#[derive(Accounts)]
pub struct UnstakeNft<'info> {
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

    pub token_program: Program<'info, Token>,

    /// CHECK: This is not dangerous because we don't read or write from this account
    #[account(constraint = token_metadata_program.key == &mpl_token_metadata::ID)]
    pub token_metadata_program: AccountInfo<'info>,
}

impl UnstakeNft<'_> {
    pub fn process_instruction(ctx: &mut Context<Self>) -> Result<()> {
        let user_pool = &mut ctx.accounts.user_pool;
        let exist = user_pool.remove_stake_info(ctx.accounts.nft_mint.key())?;
        require!(exist, StakingError::InvalidMetadata);

        // Thaw delegated Account
        let global_bump = *ctx.bumps.get("global_pool").unwrap();
        let seeds = &[GLOBAL_AUTHORITY_SEED.as_bytes(), &[global_bump]];
        let nft_mint = &ctx.accounts.nft_mint;

        invoke_signed(
            &thaw_delegated_account(
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

        Ok(())
    }
}
