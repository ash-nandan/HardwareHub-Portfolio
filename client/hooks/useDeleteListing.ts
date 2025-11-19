import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import request from 'superagent'

const rootURL = new URL(`/api/v1`, document.baseURI)

export function useDeleteListing() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (listingId: number) => {
      await request.delete(`${rootURL}/listings/${listingId}`)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['listings'] })
      navigate('/listings')
    },

    onError: (error) => {
      console.error('Delete failed', error)
    },
  })
}
