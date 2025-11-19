use anchor_lang::prelude::*;

//#[error]
#[error_code]
pub enum ErrorCode {
    #[msg("The auction is not active.")]
    AuctionNotActive,
    #[msg("The bid is too low.")]
    BidTooLow,
    #[msg("Unauthorized action.")]
    Unauthorized,
}