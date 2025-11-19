import { AppHero } from '@/components/app-hero'

const chainAuctions: { id: string; owner: string, bid: string; bidder: string }[] = [
  { id: 'AAAA1111', owner: 'OWNER1111', bid: '100', bidder: 'BIDDER1111' },
  { id: 'BBBB2222', owner: 'OWNER2222', bid: '200', bidder: 'BIDDER2222' },
  { id: 'CCCC3333', owner: 'OWNER3333', bid: '300', bidder: 'BIDDER3333' },
]

export function AuctionsLayout() {
  return (
    <div>
      <AppHero title="Auctions on-chain" subtitle="These are on-chain auctions." />
      <div className="max-w-xl mx-auto py-6 sm:px-6 lg:px-8 text-center">
        <div className="space-y-2">
          <div>
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Owner</th>
                  <th>Bid</th>
                  <th>Bidder</th>
                </tr>
              </thead>
              <tbody>
              {chainAuctions.map((chainAuction, index) => (
                <tr key={index}>
                  <td>{chainAuction.id}</td>
                  <td>{chainAuction.owner}</td>
                  <td>{chainAuction.bid}</td>
                  <td>{chainAuction.bidder}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
          <div>
            <form>
              <input type="number" name="startBid" id="startBid" placeholder="Input start bid..." />
              <button type="button">Initialize</button>
            </form>
          </div>
          <div>
            <form>
              <input type="text" name="auctionId" id="auctionId" placeholder="Input auction id..." />
              <input type="number" name="placeBid" id="placeBid" placeholder="Input bid..." />
              <button type="button">Place bid</button>
            </form>
          </div>
          <div>
            <form>
              <input type="text" name="auctionId" id="auctionId" placeholder="Input auction id..." />
              <button type="button">End auction</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
