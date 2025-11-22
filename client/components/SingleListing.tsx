import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { getSingleListing } from '../apis/listings'
import { ArrowLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router'
import { DeleteListing } from './DeleteListing'
import { UpdateListing } from './UpdateListingButton'

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

  const getImgSrc = (itemImage: string) => {
    if (!itemImage) return '/default-image.png'
    if (itemImage.startsWith('data:')) return itemImage
    if (itemImage.startsWith('/')) return itemImage
    return `/images-listings/${itemImage}`
  }

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
          className="m-5 flex text-3xl text-hardware-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          <p className="font-mono text-sm">Back to Listings</p>
        </Button>

        <img
          src={getImgSrc(data.itemImage)}
          alt={data.itemName}
          className="h-64 w-full object-cover"
        ></img>

        <div className="max-w-md rounded-none bg-hardware-white p-6">
          <h3 className="mb-4 font-mono text-lg">{data.itemName}</h3>

          <p className="text-sm">{`Condition: ${data.conditionDescription}`}</p>
          <p className="mb-4 text-sm">{`Starting Price: $${data.startingPrice.toFixed(2)}`}</p>

          <p className="text-sm">
            Category:{' '}
            <span className="font-semibold">{`${data.categoryName}`}</span>
          </p>
          <p className="text-sm">
            Seller: <span className="font-semibold">{`${data.username}`}</span>
          </p>
          <div className="flex gap-4">
            <DeleteListing listingId={data.listingId} />
            <UpdateListing listingId={data.listingId} />
          </div>
        </div>
      </div>

      <div className="max-w-xl">
        <div className="mr-6 mt-20 max-w-xl rounded-none bg-hardware-white p-6">
          <p className="mb-4 font-mono font-bold">Description:</p>

          <p className="text-hardware-charcoal">{data.itemDescription}</p>
        </div>
      </div>
    </div>
  )
}

export default SingleListing
