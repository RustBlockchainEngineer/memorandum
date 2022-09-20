use anchor_lang::prelude::*;
use std::str::FromStr;
#[account]
#[derive(Default)]
pub struct GlobalState {
    pub bump: u8,
    pub super_owner: Pubkey,
    pub penalty_wallet: Pubkey,

    // this space is for extra fields after contract deployed
    pub reserved: [u128; 7],
}

#[account]
#[derive(Default)]
pub struct MemorandumManager {
    pub bump: u8,
    pub penalty_mint: Pubkey,
    pub penalty_amount: u64,

    // this space is for extra fields after contract deployed
    pub reserved: [u128; 5],
}

#[account]
#[derive(Default)]
pub struct Memorandum {
    pub bump: u8,
    pub creator: Pubkey,
    pub memorandum_manager: Pubkey,
    pub title: String,
    pub content: String,

    // this space is for extra fields after contract deployed
    pub reserved: [u128; 7],
}
