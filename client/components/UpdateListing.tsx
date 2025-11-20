import { Button } from '@/components/ui/button'
import { updateListing as apiUpdate } from '../apis/listings'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { UserListing } from 'models/listings'

export interface UpdateListingProps {
  listingId: number
  updatedData: Partial<UserListing>
}
export function UpdateListing(props: UpdateListingProps) {
  const { listingId, updatedData } = props
  const queryClient = useQueryClient()

  const updateMutation = useMutation({
    mutationFn: (data: UpdateListingProps) =>
      apiUpdate(data.listingId, data.updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings'] })
    },
  })

  const handleUpdate = () => {
    updateMutation.mutate({ listingId, updatedData })
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
