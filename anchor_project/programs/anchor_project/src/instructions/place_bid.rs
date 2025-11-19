use anchor_lang::prelude::*;
use anchor_lang::system_program;
use anchor_lang::solana_program::program::invoke;
use anchor_lang::solana_program::system_instruction::transfer;
use crate::state::Auction;
use crate::errors::ErrorCode;
//use crate::events::PlaceBidEvent;

#[derive(Accounts)]
pub struct PlaceBid<'info> {
    #[account(mut)]
    pub auction: Account<'info, Auction>,
    pub bidder: Signer<'info>,
}

pub fn _place_bid(ctx: Context<PlaceBid>, bid_amount: u64) -> Result<()> {
    let auction = &mut ctx.accounts.auction;
    if !auction.is_active {
        return Err(ErrorCode::AuctionNotActive.into());
    }
    if bid_amount <= auction.highest_bid {
        return Err(ErrorCode::BidTooLow.into());
    }

    auction.highest_bid = bid_amount;
    auction.highest_bidder = *ctx.accounts.bidder.key;
    Ok(())
}
