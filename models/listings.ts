export interface UserListing {
  id: number
  userId: number
  categoryId: number
  conditionId: number
  itemName: string
  startingPrice: number
  itemDescription: string
  itemImage: string
}

export interface NewListingData {
  userId: number
  categoryId: number
  conditionId: number
  itemName: string
  startingPrice: number
  itemDescription: string
  itemImage: string
}
export interface Listing {
  listingId: number
  categoryName: string
  conditionDescription: string
  itemName: string
  startingPrice: number
  itemDescription: string
  itemImage: string
  username: string
}
