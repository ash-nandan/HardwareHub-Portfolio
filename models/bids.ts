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

