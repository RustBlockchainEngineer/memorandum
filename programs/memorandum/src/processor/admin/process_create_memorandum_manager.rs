use crate::{constant::*, states::*};
use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, Token};
pub fn handle(
    ctx: Context<CreateMemorandumManager>,
    penalty_amount: u64
) -> Result<()> {

    ctx.accounts.memorandum_manager.bump = *ctx.bumps.get("memorandum_manager").unwrap();
    ctx.accounts.memorandum_manager.penalty_mint = ctx.accounts.penalty_mint.key();
    ctx.accounts.memorandum_manager.penalty_amount = penalty_amount;

    Ok(())
}

#[derive(Accounts)]
#[instruction()]
pub struct CreateMemorandumManager<'info> {
    #[account(mut)]
    pub super_owner: Signer<'info>,
    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(
        init,
        seeds = [MEMORANDUM_MANAGER_TAG, penalty_mint.key().as_ref()],
        bump,
        payer = payer,
        space = std::mem::size_of::<MemorandumManager>() + 8
    )]
    pub memorandum_manager: Box<Account<'info, MemorandumManager>>,

    pub penalty_mint: Box<Account<'info, Mint>>,

    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub rent: Sysvar<'info, Rent>,
}
