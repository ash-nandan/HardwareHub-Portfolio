export interface Bid {
  id: number
  userId: number
  userListingId: number
  bidPrice: number
  createdAt: string
}

export interface BidData {
  userId: number
  userListingId: number
  bidPrice: number
}

export interface BidWithListing {
  bidId: number
  listingId: number
  startingPrice: number
  bidCreated: string
  bidPrice: number
  itemName: string
  itemDescription: string
  itemImage: string
}

export interface BidCheck {
  bidId: number
  listingId: number
  bidCreated: string
  bidPrice: number
  bidUsername: string
}
