export interface UserListing {
  id: number
  user_id: number
  category_id: number
  condition_id: number
  item_name: string
  starting_price: number
  item_description: string
  item_image: string
}

export interface NewListingData {
  user_id: number
  category_id: number
  condition_id: number
  item_name: string
  starting_price: number
  item_description: string
  item_image: string
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
  userId: number
}

export interface ListingActiveTime extends Listing {
  createdAt: string
  isActive: boolean
}

export interface ClosedListingCheck {
  listingId: number
  itemName: string
  itemImage: string
  isActive: boolean
}

export interface SwitchConfirmed {
  newUserId: number
  listingId: number
}
