import { Button } from '@/components/ui/button'
import { updateListing } from 'client/apis/listings'

export interface UpdateListingProps {
  listingId: number
  updatedData: {
    item_name?: string
    starting_price?: number
    item_description?: string
    item_image?: string
  }
}
export function updateListing(props: UpdateListingProps) {
  const { listingId, updatedData } = props

  const handleUpdate = async () => {
    try {
      const response = await updateListing(listingId, updatedData)
    } catch (error) {
      console.error('Error updating your listing', error)
    }
  }
}
