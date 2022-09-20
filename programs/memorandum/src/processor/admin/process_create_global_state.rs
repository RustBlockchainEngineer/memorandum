use crate::{constant::*, states::*, utils::*, error::*};
use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, Token, TokenAccount};
use std::str::FromStr;
use crate::program::Memorandum;
pub fn handle(
    ctx: Context<CreateGlobalState>,
) -> Result<()> {

    ctx.accounts.global_state.bump = *ctx.bumps.get("global_state").unwrap();
    ctx.accounts.global_state.super_owner = ctx.accounts.super_owner.key();
    ctx.accounts.global_state.penalty_wallet = Pubkey::from_str(DEFAULT_PENALTY_WALLET).unwrap();

    Ok(())
}

#[derive(Accounts)]
#[instruction()]
pub struct CreateGlobalState<'info> {
    #[account(mut)]
    pub super_owner: Signer<'info>,
    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(
        init,
        seeds = [GLOBAL_STATE_TAG],
        bump,
        payer = payer,
        space = std::mem::size_of::<GlobalState>() + 8
    )]
    pub global_state: Box<Account<'info, GlobalState>>,

    #[account(constraint = memorandum_program.programdata_address()? == Some(program_data.key()) @ MemorandumError::InvalidProgramData)]
    pub memorandum_program: Program<'info, Memorandum>,

    #[account(constraint = program_data.upgrade_authority_address == Some(super_owner.key()) @ MemorandumError::InvalidProgramUpgradeAuthority)]
    pub program_data: Account<'info, ProgramData>,

    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}
