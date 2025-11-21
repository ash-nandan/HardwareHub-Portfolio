import { Button } from '@/components/ui/button'
import { useDeleteListing } from '../hooks/useDeleteListing'

interface DeleteListingProps {
  listingId: number
}

export function DeleteListing({ listingId }: DeleteListingProps) {
  const deleteListing = useDeleteListing()

  const handleDelete = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this listing? This action cannot be undone',
    )
    if (!confirmed) return

    deleteListing.mutate(listingId)
  }
  return (
    <div>
      <Button
        onClick={handleDelete}
        disabled={deleteListing.isPending}
        className="mt-6 rounded-sm bg-hardware-charcoal px-4 py-2 text-sm text-white hover:bg-red-700/90"
      >
        {deleteListing.isPending ? 'Deleting...' : 'Delete Listing'}
      </Button>
    </div>
  )
}
