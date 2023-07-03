use crate::*;

/**
 * Global pool stores admin address
 */
#[account]
#[derive(Default)]
pub struct GlobalPool {
    pub admin: Pubkey, //  32
}

impl GlobalPool {
    pub const DATA_SIZE: usize = 32;
}

/**
 * User pool stores user's stake data
 */
#[account]
#[derive(Default)]
pub struct UserPool {
    pub user: Pubkey,               // 32
    pub stake_cnt: u8,              // 1
    pub stake_data: Vec<StakeInfo>, // 4 + StakeInfo::DATA_SIZE * StakeInfo::MAX_CNT
}

impl UserPool {
    pub const DATA_SIZE: usize = 32 + 1 + 4 + StakeInfo::DATA_SIZE * StakeInfo::MAX_CNT;

    //  Add new StakeInfo to vector
    pub fn add_stake_info(&mut self, mint: Pubkey) -> Result<()> {
        //  Users can stake up to the maximum number of MAX_CNT
        //  Should resize to stake more
        require!(
            self.stake_data.len() < StakeInfo::MAX_CNT,
            StakingError::ExceedMaxCount
        );

        //  Add stake info
        self.stake_data.push(StakeInfo {
            mint,
            time: Clock::get()?.unix_timestamp,
        });
        self.stake_cnt += 1;

        Ok(())
    }

    //  Calculate withraw amount and remove from StakeInfo vector
    pub fn remove_stake_info(&mut self, mint: Pubkey) -> Result<bool> {
        let mut exist = false;
        for (index, item) in self.stake_data.iter().enumerate() {
            if item.mint == mint {
                exist = true;
                self.stake_data.swap_remove(index);
                break;
            }
        }
        self.stake_cnt -= 1;

        Ok(exist)
    }
}

#[derive(AnchorSerialize, AnchorDeserialize, Default, Clone)]
pub struct StakeInfo {
    //  NFT mint address
    pub mint: Pubkey, // 32
    //  Staked time
    pub time: i64, // 8
}

impl StakeInfo {
    pub const DATA_SIZE: usize = 32 + 8;
    pub const MAX_CNT: usize = 50;
}
