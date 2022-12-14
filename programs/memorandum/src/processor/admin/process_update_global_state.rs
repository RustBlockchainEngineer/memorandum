use crate::{constant::*, states::*};
use anchor_lang::prelude::*;
pub fn handle(
    ctx: Context<UpdateGlobalState>,
    super_owner: Pubkey,
    penalty_wallet: Pubkey
) -> Result<()> {

    ctx.accounts.global_state.super_owner = super_owner;
    ctx.accounts.global_state.penalty_wallet = penalty_wallet;

    Ok(())
}

#[derive(Accounts)]
#[instruction()]
pub struct UpdateGlobalState<'info> {
    #[account(mut)]
    pub super_owner: Signer<'info>,

    #[account(
        mut,
        seeds = [GLOBAL_STATE_TAG],
        bump = global_state.bump,
        has_one = super_owner
    )]
    pub global_state: Box<Account<'info, GlobalState>>,
}
