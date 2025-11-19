use anchor_lang::prelude::*;
use anchor_lang::system_program;
use anchor_lang::solana_program::program::invoke;
use anchor_lang::solana_program::system_instruction::transfer;
use crate::state::Auction;
use crate::errors::ErrorCode;
//use crate::events::EndAuctionEvent;

#[derive(Accounts)]
pub struct EndAuction<'info> {
    #[account(mut)]
    pub auction: Account<'info, Auction>,
    pub owner: Signer<'info>,
}

pub fn _end_auction(ctx: Context<EndAuction>) -> Result<()> {
    let auction = &mut ctx.accounts.auction;
    if *ctx.accounts.owner.key != auction.owner {
        return Err(ErrorCode::Unauthorized.into());
    }
    auction.is_active = false;
    Ok(())
}
