use anchor_lang::prelude::*;
use crate::state::Auction;
//use crate::events::InitializeVaultEvent;

#[derive(Accounts)]
pub struct InitializeAuction<'info> {
    #[account(init, payer = owner, space = 8 + 32 + 8 + 32 + 1)]
    pub auction: Account<'info, Auction>,
    
    #[account(mut)]
    pub owner: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

pub fn _init_auction(ctx: Context<InitializeAuction>, starting_bid: u64) -> Result<()> {
    let auction = &mut ctx.accounts.auction;
    auction.owner = *ctx.accounts.owner.key;
    auction.highest_bid = starting_bid;
    auction.highest_bidder = Pubkey::default();
    auction.is_active = true;
    Ok(())
}