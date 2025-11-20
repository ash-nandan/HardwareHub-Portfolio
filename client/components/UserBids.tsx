import { useQuery } from '@tanstack/react-query'
import { getUserBids } from '../apis/bids'
import { useNavigate, useParams } from 'react-router'
import { ChevronRight } from 'lucide-react'

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

  return (
    <div>
      <h1 className="py-8 text-center font-mono text-3xl text-white">
        My Bids
      </h1>
      <div className="flex flex-wrap justify-center space-x-6">
        {data.map((list) => (
          <div key={list.listingId}>
            <img
              src={`/images-listings/${list.itemImage}`}
              alt={list.itemName}
              className="max-w-md"
            ></img>
            <div className="mb-12 max-w-md rounded-none bg-hardware-white p-6">
              <h3 className="mb-4 font-mono text-lg">{list.itemName}</h3>
              <p className="mb-4 text-sm">{`Starting Price: $${list.startingPrice.toFixed(2)}`}</p>
              <p className="font-mono text-sm font-bold">Your Bids</p>
              {data.map((bid) => (
                <div
                  className="my-4 flex max-w-56 justify-between pl-6 text-sm"
                  key={bid.bidId}
                >
                  <p>{`$${bid.bidPrice.toFixed(2)}`}</p>
                  <p>{bid.bidCreated}</p>
                </div>
              ))}
              <div className="flex justify-end">
                <ChevronRight
                  onClick={() => navigate(`/listings/${list.listingId}`)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
