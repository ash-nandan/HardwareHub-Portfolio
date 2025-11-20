import { useQuery } from '@tanstack/react-query'
import { searchListings } from '../apis/listings'
import { useLocation, useNavigate } from 'react-router'
import { ChevronRight } from 'lucide-react'

export function SearchResults() {
  const { state } = useLocation()
  const { catId, conId, keywords } = state
  const navigate = useNavigate()

  const { data, isPending, error } = useQuery({
    queryKey: ['search', catId, conId, keywords],
    queryFn: async () => {
      return searchListings(catId, conId, keywords)
    },
  })

  if (isPending) {
    return <p className="mt-8 text-center text-hardware-white">Searching...</p>
  }

  if (error) {
    return (
      <p className="mt-8 text-center text-hardware-white">{error.message}</p>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="mt-8 text-center text-hardware-white">
        <h1 className="mb-4 font-mono text-3xl">No results found</h1>
        <p>Try a different category, condition, or keywords.</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="py-8 text-center font-mono text-3xl text-white">
        {`${data.length} results found`}
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
