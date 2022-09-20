use crate::{constant::*, states::*, utils::*, error::*};
use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, Token, TokenAccount};
use std::str::FromStr;
pub fn handle(
    ctx: Context<UpdateMemorandum>,
    title: String,
    content: String,
) -> Result<()> {
    let penalty_amount = ctx.accounts.memorandum_manager.penalty_amount;
    if penalty_amount > 0 {
        // pay penalty amount
        let transfer_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.user_vault.to_account_info(),
                to: ctx.accounts.penalty_vault.to_account_info(),
                authority: ctx.accounts.creator.to_account_info(),
            },
        );
        token::transfer(transfer_ctx, ctx.accounts.memorandum_manager.penalty_amount)?;
    }
    ctx.accounts.memorandum.title = title;
    ctx.accounts.memorandum.content = content;

    Ok(())
}
#[derive(Accounts)]
#[instruction()]
pub struct UpdateMemorandum<'info> {
    #[account(mut)]
    pub creator: Signer<'info>,

    #[account(
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
        mut,
        seeds = [MEMORANDUM_TAG, &memorandum.memorandum_num.to_be_bytes()],
        bump = memorandum.bump,
        has_one = creator,
        has_one = memorandum_manager,
        constraint = title.len() <= TITLE_LENGTH @ MemorandumError::InvalidLength,
        constraint = content.len() <= CONTENT_LENGTH @ MemorandumError::InvalidLength,
    )]
    pub memorandum: Box<Account<'info, Memorandum>>,

    #[account(mut,
        constraint = penalty_vault.owner == global_state.penalty_wallet @ MemorandumError::InvalidOwner,
        constraint = penalty_vault.mint == memorandum_manager.penalty_mint @ MemorandumError::InvalidMint,
    )]
    pub penalty_vault: Box<Account<'info, TokenAccount>>,

    #[account(mut,
        constraint = user_vault.owner == creator.key() @ MemorandumError::InvalidOwner,
        constraint = user_vault.mint == memorandum_manager.penalty_mint @ MemorandumError::InvalidMint,
        constraint = user_vault.amount >= memorandum_manager.penalty_amount @ MemorandumError::InvalidAmount,
    )]
    pub user_vault: Box<Account<'info, TokenAccount>>,

    pub token_program: Program<'info, Token>,
}
