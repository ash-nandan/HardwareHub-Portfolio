import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router'
import { ChevronRight } from 'lucide-react'
import { timeAgo } from '../utils/timeAgo'
import { getUserListings } from '../apis/users'

export function UserListings() {
  const params = useParams()
  const userId = Number(params.id)
  const navigate = useNavigate()

  const { data, isPending, error } = useQuery({
    queryKey: ['listings', userId],
    queryFn: async () => {
      return getUserListings(userId)
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
    <div>
      <h1 className="py-8 text-center font-mono text-3xl text-white">
        My Listings
      </h1>
      <div className="ml-4 mr-4">
        <div className="mx-auto grid max-w-6xl grid-cols-1 place-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((listing) => (
            <div key={listing.listingId}>
              <img
                src={`/images-listings/${listing.itemImage}`}
                alt={listing.itemName}
              ></img>
              <div className="mb-12 rounded-none bg-hardware-white p-6">
                <h3 className="mb-4 font-mono text-lg">{listing.itemName}</h3>
                <p className="mb-8 text-sm">{`Starting Price: $${listing.startingPrice.toFixed(2)}`}</p>

                <div className="my-4 flex max-w-32 justify-between text-sm">
                  <p>Posted:</p>
                  <p className="font-style: italic">
                    {timeAgo(listing.createdAt)}
                  </p>
                </div>

                <div className="flex justify-end">
                  <ChevronRight
                    onClick={() => navigate(`/listings/${listing.listingId}`)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
