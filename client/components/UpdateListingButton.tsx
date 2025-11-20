import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router'

export interface UpdateListingProps {
  listingId: number
}
export function UpdateListing(props: UpdateListingProps) {
  const { listingId } = props
  const navigate = useNavigate()

  const handleUpdate = () => {
    navigate(`/listings/${listingId}/edit`)
  }

  return (
    <div>
      <Button
        className="mt-6 rounded-sm bg-hardware-charcoal px-4 py-2 text-sm text-white "
        onClick={handleUpdate}
      >
        Update Listing
      </Button>
    </div>
  )
}
