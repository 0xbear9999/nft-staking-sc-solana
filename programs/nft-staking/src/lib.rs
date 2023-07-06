use anchor_lang::{prelude::*, AnchorDeserialize};

pub mod constant;
pub mod error;
pub mod instructions;
pub mod state;
use constant::*;
use error::*;
use instructions::*;
use state::*;

declare_id!("Dy5euDjeY22ZaevosvsiNADVATGoDVsvPWvpgKf9HvnP");

#[program]
pub mod nft_staking {
    use super::*;

    /**
     * Initialize global pool
     * super admin sets to the caller of this instruction
     */
    pub fn initialize(mut ctx: Context<Initialize>) -> Result<()> {
        Initialize::process_instruction(&mut ctx)
    }

    //  Initialize user pool
    pub fn init_user(mut ctx: Context<InitUser>) -> Result<()> {
        InitUser::process_instruction(&mut ctx)
    }

    /**
     * User can stake NFTs from specific collection
     */
    pub fn stake_nft(mut ctx: Context<StakeNft>) -> Result<()> {
        StakeNft::process_instruction(&mut ctx)
    }

    /**
     * User can unstake NFTs when they want
     */
    pub fn unstake_nft(mut ctx: Context<UnstakeNft>) -> Result<()> {
        UnstakeNft::process_instruction(&mut ctx)
    }

    pub fn lock_pnft(ctx: Context<LockPNFT>) -> Result<()> {
        lock_pnft::lock_pnft_handler(ctx)
    }

    pub fn unlock_pnft(ctx: Context<UnlockPNFT>) -> Result<()> {
        unlock_pnft::unlock_pnft_handler(ctx)
    }
}
