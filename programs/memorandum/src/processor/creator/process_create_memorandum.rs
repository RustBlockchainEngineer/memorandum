use crate::{constant::*, states::*, utils::*, error::*};
use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, Token, TokenAccount};
use std::str::FromStr;
pub fn handle(
    ctx: Context<CreateMemorandum>,
    title: String,
    content: String,
) -> Result<()> {

    ctx.accounts.memorandum.bump = *ctx.bumps.get("memorandum").unwrap();
    ctx.accounts.memorandum.creator = ctx.accounts.creator.key();
    ctx.accounts.memorandum.memorandum_manager = ctx.accounts.memorandum_manager.key();
    ctx.accounts.memorandum.title = title;
    ctx.accounts.memorandum.content = content;
    ctx.accounts.memorandum.memorandum_num = ctx.accounts.global_state.memorandum_count;
    ctx.accounts.global_state.memorandum_count = ctx.accounts.global_state.memorandum_count.safe_add(1)?;

    Ok(())
}
#[derive(Accounts)]
#[instruction(
    title: String,
    content: String
)]
pub struct CreateMemorandum<'info> {
    #[account(mut)]
    pub creator: Signer<'info>,
    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(
        mut,
        seeds = [GLOBAL_STATE_TAG],
        bump = global_state.bump,
    )]
    pub global_state: Box<Account<'info, GlobalState>>,

    #[account(
    seeds = [MEMORANDUM_MANAGER_TAG, memorandum_manager.penalty_mint.as_ref()],
    bump = memorandum_manager.bump,
    )]
    pub memorandum_manager: Box<Account<'info, MemorandumManager>>,

    #[account(
    init,
    seeds = [MEMORANDUM_TAG, &global_state.memorandum_count.to_be_bytes()],
    bump,
    payer = payer,
    space = std::mem::size_of::<Memorandum>() + 8 + TITLE_LENGTH + CONTENT_LENGTH,
    constraint = title.len() <= TITLE_LENGTH @ MemorandumError::InvalidLength,
    constraint = content.len() <= CONTENT_LENGTH @ MemorandumError::InvalidLength,
    )]
    pub memorandum: Box<Account<'info, Memorandum>>,

    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}
