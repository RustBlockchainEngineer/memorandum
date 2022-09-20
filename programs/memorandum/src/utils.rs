use crate::{error::*};
use anchor_lang::prelude::*;

pub fn assert_pda(seeds: &[&[u8]], program_id: &Pubkey, pda: &Pubkey) -> Result<()> {
    let (found_key, _bump) = Pubkey::find_program_address(seeds, program_id);
    if found_key != *pda {
        return Err(error!(MemorandumError::InvalidProgramAddress));
    }
    Ok(())
}
pub trait SafeCalc<T> {
    fn safe_add(&self, num: T) -> Result<T>;
    fn safe_sub(&self, num: T) -> Result<T>;
    fn safe_mul(&self, num: T) -> Result<T>;
    fn safe_div(&self, num: T) -> Result<T>;
}
impl SafeCalc<u32> for u32 {
    fn safe_add(&self, num: u32) -> Result<u32> {
        let result = self.checked_add(num);
        if result.is_none() {
            return Err(error!(MemorandumError::MathOverflow));
        }
        Ok(result.unwrap())
    }
    fn safe_sub(&self, num: u32) -> Result<u32> {
        let result = self.checked_sub(num);
        if result.is_none() {
            return Err(error!(MemorandumError::MathOverflow));
        }
        Ok(result.unwrap())
    }
    fn safe_mul(&self, num: u32) -> Result<u32> {
        let result = self.checked_mul(num);
        if result.is_none() {
            return Err(error!(MemorandumError::MathOverflow));
        }
        Ok(result.unwrap())
    }
    fn safe_div(&self, num: u32) -> Result<u32> {
        let result = self.checked_div(num);
        if result.is_none() {
            return Err(error!(MemorandumError::MathOverflow));
        }
        Ok(result.unwrap())
    }
}
impl SafeCalc<u64> for u64 {
    fn safe_add(&self, num: u64) -> Result<u64> {
        let result = self.checked_add(num);
        if result.is_none() {
            return Err(error!(MemorandumError::MathOverflow));
        }
        Ok(result.unwrap())
    }
    fn safe_sub(&self, num: u64) -> Result<u64> {
        let result = self.checked_sub(num);
        if result.is_none() {
            return Err(error!(MemorandumError::MathOverflow));
        }
        Ok(result.unwrap())
    }
    fn safe_mul(&self, num: u64) -> Result<u64> {
        let result = self.checked_mul(num);
        if result.is_none() {
            return Err(error!(MemorandumError::MathOverflow));
        }
        Ok(result.unwrap())
    }
    fn safe_div(&self, num: u64) -> Result<u64> {
        let result = self.checked_div(num);
        if result.is_none() {
            return Err(error!(MemorandumError::MathOverflow));
        }
        Ok(result.unwrap())
    }
}
impl SafeCalc<u128> for u128 {
    fn safe_add(&self, num: u128) -> Result<u128> {
        let result = self.checked_add(num);
        if result.is_none() {
            return Err(error!(MemorandumError::MathOverflow));
        }
        Ok(result.unwrap())
    }
    fn safe_sub(&self, num: u128) -> Result<u128> {
        let result = self.checked_sub(num);
        if result.is_none() {
            return Err(error!(MemorandumError::MathOverflow));
        }
        Ok(result.unwrap())
    }
    fn safe_mul(&self, num: u128) -> Result<u128> {
        let result = self.checked_mul(num);
        if result.is_none() {
            return Err(error!(MemorandumError::MathOverflow));
        }
        Ok(result.unwrap())
    }
    fn safe_div(&self, num: u128) -> Result<u128> {
        let result = self.checked_div(num);
        if result.is_none() {
            return Err(error!(MemorandumError::MathOverflow));
        }
        Ok(result.unwrap())
    }
}
