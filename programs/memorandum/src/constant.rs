use anchor_lang::prelude::*;

#[constant]
pub const DEFAULT_PENALTY_WALLET: &str = "FeikG7Kui7zw8srzShhrPv2TJgwAn61GU7m8xmaK9GnW";
#[constant]
pub const TITLE_LENGTH: u32 = 50;
#[constant]
pub const CONTENT_LENGTH: u32 = 500;

#[constant]
pub const GLOBAL_STATE_SEED: &str = "GLOBAL_STATE_SEED";
pub const GLOBAL_STATE_TAG: &[u8] = GLOBAL_STATE_SEED.as_bytes();
