import { Button } from '@/components/ui/button'
import { useDeleteListing } from '../hooks/useDeleteListing'

interface DeleteListingProps {
  listingId: number
}

export function DeleteListing({ listingId }: DeleteListingProps) {
  const deleteListing = useDeleteListing()

  const handleDelete = async () => {
    deleteListing.mutate(listingId)
  }
  return (
    <div>
      <Button
        onClick={handleDelete}
        className="mt-6 rounded-sm bg-hardware-charcoal px-4 py-2 text-sm text-white"
      >
        Delete Listing
      </Button>
    </div>
  )
}
