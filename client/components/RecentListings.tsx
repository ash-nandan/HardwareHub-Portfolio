import { useQuery } from '@tanstack/react-query'
import { getRecentListings } from '../apis/listings'
import { useNavigate } from 'react-router'
import { ChevronRight } from 'lucide-react'
import { timeAgo } from '../utils/timeAgo'

export function RecentListings() {
  const navigate = useNavigate()

  const { data, isPending, error } = useQuery({
    queryKey: ['recentListings'],
    queryFn: async () => {
      return getRecentListings()
    },
  })

  const getImgSrc = (itemImage: string) => {
    if (!itemImage) return '/default-image.png'
    if (itemImage.startsWith('data:')) return itemImage
    if (itemImage.startsWith('/')) return itemImage
    return `/images-listings/${itemImage}`
  }

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
        <h1 className="mb-4 font-mono text-3xl">No Recent Listings</h1>
      </div>
    )
  }
  return (
    <div>
      <div className="drop-shadow-[0_0_3px_rgba(130,200,255,0.6)]">
        <img
          src={'/images-app/landing-page-cover.jpg'}
          alt="find it build it cover"
          className="mx-auto hidden w-full max-w-xl p-12 sm:block md:max-w-4xl lg:max-w-6xl"
        ></img>
      </div>
      <h1 className="py-8 text-center font-mono text-3xl text-white">
        Recent Listings
      </h1>
      <div className="ml-4 mr-4">
        <div className="mx-auto grid max-w-6xl grid-cols-1 place-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((listing) => (
            <div key={listing.listingId}>
              <img
                src={getImgSrc(listing.itemImage)}
                alt=""
                className="h-64 w-full object-cover"
              ></img>
              <div className="mb-12 rounded-none bg-hardware-white p-6">
                <h2 className="mb-4 font-mono text-lg">{listing.itemName}</h2>
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

//tailwind styling note:
//drop-shadow-[0_0_3px_rgba(130,200,255,0.6)]
//set a shadow on image with strength of 3px and our sky colour broken down into rgba format
