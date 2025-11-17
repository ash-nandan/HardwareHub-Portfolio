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
  condditonId: number
  itemName: string
  startingPrice: number
  itemDescription: string
  itemImage: string
}
