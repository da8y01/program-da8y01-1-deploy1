import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { AnchorProject } from "../target/types/anchor_project";
const { SystemProgram } = anchor.web3;
import { assert } from "chai";

describe("anchor_project", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.anchorProject as Program<AnchorProject>;
  const auctionAccount = anchor.web3.Keypair.generate();

  it("Initializes the auction", async () => {
    await program.rpc.initialize(new anchor.BN(100), {
      accounts: {
        auction: auctionAccount.publicKey,
        owner: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId
      },
      signers: [auctionAccount]
    });

    const account = await program.account.auction.fetch(auctionAccount.publicKey);
    console.log('Auction initialized with highest bid: ', account.highestBid.toString());
    // The highest bid should be 100 after initialization.
    assert.ok(account.highestBid.toString() === '100');
  });

  it('Places a bid', async () => {
    const bidder = anchor.web3.Keypair.generate();
    await provider.connection.requestAirdrop(bidder.publicKey, 1000000000);
    const bidderProvider = new anchor.AnchorProvider(provider.connection, new anchor.Wallet(bidder), {});
    anchor.setProvider(bidderProvider);

    console.log("before rpc.placeBid()");
    console.log("before rpc.placeBid() 2");
    await program.rpc.placeBid(new anchor.BN(150), {
      accounts: {
        auction: auctionAccount.publicKey,
        bidder: bidder.publicKey,
      },
    });
    console.log("after rpc.placeBid()");

    const account = await program.account.auction.fetch(auctionAccount.publicKey);
    console.log('Highest bid: ', account.highestBid.toString());
    // The highest bid should be 150 after placing the bid.
    assert.ok(account.highestBid.toString() === '150');
    assert.ok(account.highestBidder.equals(bidder.publicKey));
  });

  it('Ends the auction', async () => {
    await program.rpc.endAuction({
      accounts: {
        auction: auctionAccount.publicKey,
        owner: provider.wallet.publicKey,
      },
    });

    const account = await program.account.auction.fetch(auctionAccount.publicKey);
    console.log('Auction active status: ', account.isActive);
    // The auction should no longer be active.
    assert.ok(account.isActive === false);
  });
});
