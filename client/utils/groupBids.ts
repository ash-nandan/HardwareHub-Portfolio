import { BidWithListing } from 'models/bids'

export function groupBidsByListingId(bids: BidWithListing[]) {
  //Reduce an array and create a new object that has listingIds as keys and any bids that match this listing Id as the values (an array)
  return bids.reduce<Record<number, BidWithListing[]>>((groups, bid) => {
    const key = bid.listingId

    //If not a key already, start a new key:value[] set
    if (!groups[key]) {
      groups[key] = []
    }

    //If the key already exists, just add the value to it's array
    groups[key].push(bid)

    //return all results from the reduce function
    return groups
  }, {}) //an empty object is the starting place for the reduce to begin
}
