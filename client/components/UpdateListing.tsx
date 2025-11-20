import { Button } from '@/components/ui/button'
import { updateListing as apiUpdate } from 'client/apis/listings'
import { useQueryClient, useMutation } from '@tanstack/react-query'

export interface UpdateListingProps {
  listingId: number
  updatedData: {
    item_name?: string
    starting_price?: number
    item_description?: string
    item_image?: string
  }
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

  const handleUpdate = async () => {
    updateMutation.mutate({ listingId, updatedData })
  }
}
