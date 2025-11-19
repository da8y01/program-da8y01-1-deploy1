use anchor_lang::prelude::*;

#[account]
pub struct Auction {
    pub owner: Pubkey,
    pub highest_bid: u64,
    pub highest_bidder: Pubkey,
    pub is_active: bool,
}
