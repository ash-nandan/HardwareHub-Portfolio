import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { getSingleListing } from '../apis/listings'
import { ArrowLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router'
import { DeleteListing } from './DeleteListing'
import { UpdateListing } from './UpdateListingButton'
import { useAuth } from '../hooks/authHooks'
import { checkBids } from '../apis/bids'

export function SingleListing() {
  const params = useParams()
  const listingId = Number(params.id)
  const navigate = useNavigate()
  const { isOwner } = useAuth()

  const { data, isPending, error } = useQuery({
    queryKey: ['listings', listingId],
    queryFn: async () => {
      return getSingleListing(listingId)
    },
  })

  const {
    data: bidData,
    isPending: bidIsPending,
    error: bidError,
  } = useQuery({
    queryKey: ['bids', listingId],
    queryFn: async () => {
      return checkBids(listingId)
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

  if (bidIsPending) {
    return <p>Loading...</p>
  }

  if (bidError) {
    return <p>{bidError.message}</p>
  }

  if (!bidData) {
    return <p>Data not found</p>
  }

  const canManage = isOwner(data.userId) && data.isActive

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
          {canManage && (
            <div className="flex gap-4">
              <DeleteListing listingId={data.listingId} />
              <UpdateListing listingId={data.listingId} />
            </div>
          )}
          <>
            {bidData && bidData.length > 0 ? (
              <div className="mt-6 flex justify-end gap-4">
                <p className="mt-2 text-sm font-bold">This auction has ended</p>
                <Button
                  onClick={() => {
                    //create modal that finds dom element with matching id
                    const modal = document.getElementById(
                      'finalise-modal',
                    ) as HTMLDialogElement
                    modal.showModal()
                  }}
                  className="bg-red-600 text-hardware-white"
                >
                  Finalise Sale
                </Button>
              </div>
            ) : (
              <div className="mt-6">
                <p className="text-sm text-gray-500"> No bids yet</p>
              </div>
            )}
            {/* the matching id means this dialog box will render */}
            <dialog
              id="finalise-modal"
              className="spacy-y-4 pointer-events-none flex max-w-lg flex-col rounded-xl bg-hardware-charcoal p-6 text-center text-hardware-white opacity-0 shadow-2xl transition-all duration-300 backdrop:bg-black/40 backdrop:backdrop-blur-sm open:pointer-events-auto open:opacity-100"
            >
              <h1 className="p-12 font-mono text-2xl">
                Your sale is finalised!
              </h1>
              <h2 className="mb-12 text-center">
                The winning bid belongs to {bidData[0]?.bidUsername || 'Unkown'}
                for ${bidData[0]?.bidPrice || '0.00'}
              </h2>
              <p>This is the end of the UX for our MVP. Next steps would be:</p>
              <div className="m-4 flex text-left">
                <ul className="list-disc space-y-2 pl-2">
                  <li>
                    Save this listing to an &apos;archives&apos; table in the
                    database
                  </li>
                  <li>
                    Delete this listing from the &apos;user_listings&apos; table
                    in the database
                  </li>
                  <li>Communicate the outcome to the winning user</li>
                </ul>
              </div>
              <p className="m-4">- The Hardware Hub Team</p>
              <button
                className="mx-auto mb-4 mt-12 w-36 rounded-md bg-hardware-blue px-4 py-4 text-hardware-white"
                onClick={() => {
                  const modal = document.getElementById(
                    'finalise-modal',
                  ) as HTMLDialogElement
                  modal.close()
                  navigate('/')
                }}
              >
                Return Home
              </button>
            </dialog>
          </>
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

//Some new styling used:
//backdrop:bg = set color behind the dialog modal
//backdrop:backdrop-blur = add blur
//opacity-0 open:opacity-100 = trick to make it seem modal is 'not there' and show up (full opacity) when opened
//pointer-events-none open:pointer-events-auto = trick to disable pointer and turn on again
//transition-all duration-300 = a timed fade in for modal
