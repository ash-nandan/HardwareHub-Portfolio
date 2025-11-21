import { Button } from '@/components/ui/button'
import { useDeleteListing } from '../hooks/useDeleteListing'
import { useNavigate } from 'react-router'

interface DeleteListingProps {
  listingId: number
}

export function DeleteListing({ listingId }: DeleteListingProps) {
  const deleteListing = useDeleteListing()
  const navigate = useNavigate()

  const handleDelete = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this listing? This action cannot be undone',
    )
    if (!confirmed) return
    deleteListing.mutate(listingId, {
      onSuccess: () => {
        navigate('/')
      },
    })
  }
  return (
    <div>
      <Button
        onClick={handleDelete}
        disabled={deleteListing.isPending}
        className="mt-6 rounded-sm bg-hardware-charcoal px-4 py-2 text-sm text-white"
      >
        {deleteListing.isPending ? 'Deleting...' : ' '}
        Delete Listing
      </Button>
    </div>
  )
}
