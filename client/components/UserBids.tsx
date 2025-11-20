import { useQuery } from '@tanstack/react-query'
import { getUserBids } from '../apis/bids'
import { useNavigate, useParams } from 'react-router'
import { ChevronRight } from 'lucide-react'
import { timeAgo } from '../utils/timeAgo'
import { groupBidsByListingId } from '../utils/groupBids'

export function UserBids() {
  const params = useParams()
  const userId = Number(params.id)
  const navigate = useNavigate()

  const { data, isPending, error } = useQuery({
    queryKey: ['bids', userId],
    queryFn: async () => {
      return getUserBids(userId)
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

  //use helper function to group bids by listing
  const grouped = groupBidsByListingId(data)

  //make array of listing ids, map over these
  const listings = Object.keys(grouped)
    .map(Number)
    .map((listingId) => {
      const bids = grouped[listingId] //single out each specific listings bids
      const listing = bids[0] //single out a specific bid to reference for details

      return {
        listingId,
        listing,
        bids,
      }
    })

  return (
    <div>
      <h1 className="py-8 text-center font-mono text-3xl text-white">
        My Bids
      </h1>
      <div className="ml-4 mr-4">
        <div className="mx-auto grid max-w-6xl grid-cols-1 place-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map(({ listingId, listing, bids }) => (
            <div key={listingId}>
              <img
                src={`/images-listings/${listing.itemImage}`}
                alt={listing.itemName}
              ></img>
              <div className="mb-12 rounded-none bg-hardware-white p-6">
                <h3 className="mb-4 font-mono text-lg">{listing.itemName}</h3>
                <p className="mb-8 text-sm">{`Starting Price: $${listing.startingPrice.toFixed(2)}`}</p>
                <p className="font-mono text-sm font-bold">Your Bids</p>
                {bids.map((b) => (
                  <div
                    className="my-4 flex max-w-56 justify-between pl-6 text-sm"
                    key={b.bidId}
                  >
                    <p>{`$${b.bidPrice.toFixed(2)}`}</p>
                    <p className="font-style: italic">
                      {timeAgo(b.bidCreated)}
                    </p>
                  </div>
                ))}
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
