import { useQuery } from '@tanstack/react-query'
import { getAllListings } from '../apis/listings'
import { useNavigate } from 'react-router'
import type { Listing } from '../../models/listings'
import { ChevronRight } from 'lucide-react'

export default function AllListings() {
  const navigate = useNavigate()

  const { data, isPending, error } = useQuery({
    queryKey: ['allListings'],
    queryFn: getAllListings,
  })

  if (isPending) {
    return <p className="mt-8 text-center text-hardware-white">Loading...</p>
  }

  if (error) {
    return (
      <p className="mt-8 text-center text-hardware-white">{error.message}</p>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="mt-8 text-center text-hardware-white">
        <h1 className="mb-4 font-mono text-3xl">No Listings Found</h1>
      </div>
    )
  }

  return (
    <div className="ml-4 mr-4">
      <h1 className="py-8 text-center font-mono text-3xl text-white">
        All Listings
      </h1>
      <div className="mx-auto grid max-w-6xl grid-cols-1 place-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((listing: Listing) => (
          <div key={listing.listingId}>
            <img
              src={`/images-listings/${listing.itemImage}`}
              alt={listing.itemName}
            />
            <div className="mb-12 rounded-none bg-hardware-white p-6">
              <h3 className="mb-4 font-mono text-lg">{listing.itemName}</h3>
              <p className="mb-8 text-sm">{`Starting Price: $${listing.startingPrice.toFixed(
                2,
              )}`}</p>
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
  )
}
