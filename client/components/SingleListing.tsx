import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { getSingleListing } from '../apis/listings'
import { ArrowLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router'

export function SingleListing() {
  const params = useParams()
  const listingId = Number(params.id)
  const navigate = useNavigate()

  const { data, isPending, error } = useQuery({
    queryKey: ['listings', listingId],
    queryFn: async () => {
      return getSingleListing(listingId)
    },
  })

  if (isPending) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error.message}</p>
  }

  if (!data) {
    return <p>Data not found</p>
  }

  return (
    <div className="flex flex-wrap justify-center space-x-6">
      <div>
        <Button
          onClick={() => navigate('/listings')}
          variant="ghost"
          className="m-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
        </Button>

        <img
          src={`/images-listings/${data.itemImage}`}
          alt={data.itemName}
          className="mb-6 max-w-md"
        ></img>

        <div className="max-w-md rounded-none bg-hardware-white p-6">
          <h3 className="mb-4 font-mono text-lg">{data.itemName}</h3>

          <p className="text-sm">{`Condition: ${data.conditionDescription}`}</p>
          <p className="mb-4 text-sm">{`Starting Price: ${data.startingPrice}`}</p>

          <p className="text-sm">
            Category:{' '}
            <span className="font-semibold">{`${data.categoryName}`}</span>
          </p>
          <p className="text-sm">
            Seller: <span className="font-semibold">{`${data.username}`}</span>
          </p>

          <Button className="mt-6 rounded-sm bg-hardware-charcoal px-4 py-2 text-sm text-white">
            Delete Listing
          </Button>
        </div>
      </div>

      <div className="mt-16 h-72 max-w-xl rounded-none bg-hardware-white p-6">
        <p className="mb-4 font-mono font-bold">Description:</p>

        <p className="text-hardware-charcoal">{data.itemDescription}</p>
      </div>
    </div>
  )
}
