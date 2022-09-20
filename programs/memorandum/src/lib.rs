use anchor_lang::prelude::*;

/// constant
pub mod constant;
/// states
pub mod states;
/// error
pub mod error;
///processor
pub mod processor;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");


#[program]
pub mod memorandum {
    use super::*;

    /// upgrade authority of contract can create global state at first
    pub fn create_global_state(ctx: Context<CreateGlobalState>) -> Result<()> {
        Ok(())
    }

    /// super owner can update global state
    pub fn update_global_state(ctx: Context<UpdateGlobalState>) -> Result<()> {
        Ok(())
    }

    /// super owner can create memorandum manager
    pub fn create_memorandum_manager(ctx: Context<CreateMemorandumManager>) -> Result<()> {
        Ok(())
    }

    /// super owner can update global state
    pub fn update_memorandum_manager(ctx: Context<UpdateMemorandumManager>) -> Result<()> {
        Ok(())
    }

    /// creator can create memorandum
    pub fn create_memorandum(ctx: Context<CreateMemorandum>) -> Result<()> {
        Ok(())
    }

    /// creator can update memorandum
    pub fn update_memorandum(ctx: Context<UpdateMemorandum>) -> Result<()> {
        Ok(())
    }

}

