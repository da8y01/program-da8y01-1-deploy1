use anchor_lang::prelude::*;

mod state;
mod instructions;
mod errors;

use instructions::*;

declare_id!("CUGjLcbsRdVcathaUNNSPfzXpGder7pRkMgADzsHji29");

#[program]
pub mod anchor_project {
    use super::*;

    pub fn initialize(ctx: Context<InitializeAuction>, starting_bid: u64) -> Result<()> {
        _init_auction(ctx, starting_bid)
    }

    pub fn place_bid(ctx: Context<PlaceBid>, bid_amount: u64) -> Result<()> {
        _place_bid(ctx, bid_amount)
    }

    pub fn end_auction(ctx: Context<EndAuction>) -> Result<()> {
        _end_auction(ctx)
    }
}
