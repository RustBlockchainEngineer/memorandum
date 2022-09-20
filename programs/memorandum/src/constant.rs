use anchor_lang::prelude::*;

#[constant]
pub const DEFAULT_PENALTY_WALLET: &str = "FeikG7Kui7zw8srzShhrPv2TJgwAn61GU7m8xmaK9GnW";
#[constant]
pub const TITLE_LENGTH: usize = 50;
#[constant]
pub const CONTENT_LENGTH: usize = 500;

pub const GLOBAL_STATE_TAG: &[u8] = b"GLOBAL_STATE_TAG";
pub const MEMORANDUM_MANAGER_TAG: &[u8] = b"MEMORANDUM_MANAGER_TAG";
pub const MEMORANDUM_TAG: &[u8] = b"MEMORANDUM_TAG";
