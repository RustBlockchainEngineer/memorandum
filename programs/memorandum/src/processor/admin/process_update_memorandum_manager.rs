use crate::{constant::*, states::*};
use anchor_lang::prelude::*;
pub fn handle(
    ctx: Context<UpdateMemorandumManager>,
    penalty_amount: u64
) -> Result<()> {

    ctx.accounts.memorandum_manager.penalty_amount = penalty_amount;

    Ok(())
}

#[derive(Accounts)]
#[instruction()]
pub struct UpdateMemorandumManager<'info> {
    #[account(mut)]
    pub super_owner: Signer<'info>,

    #[account(
        mut,
        seeds = [MEMORANDUM_MANAGER_TAG, memorandum_manager.penalty_mint.as_ref()],
        bump = memorandum_manager.bump,
    )]
    pub memorandum_manager: Box<Account<'info, MemorandumManager>>,
}
