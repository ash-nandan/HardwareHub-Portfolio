import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createBid, checkBids } from '../apis/bids'
import { useAuth } from '../hooks/authHooks'

interface BiddingPanelProps {
  listingId: number
  startingPrice: number
}

export function BiddingPanel({ listingId, startingPrice }: BiddingPanelProps) {
  const { dbUserId, isAuthenticated } = useAuth()
  const queryClient = useQueryClient()

  // Fetch current bids for this listing
  const {
    data: bidData,
    isPending: bidIsPending,
    error: bidError,
  } = useQuery({
    queryKey: ['bids', listingId],
    queryFn: async () => {
      return checkBids(listingId)
    },
    refetchInterval: 2000, // Refetch every 2 seconds to show live bids
  })

  // Get current highest bid or use starting price
  const currentBid = bidData && bidData.length > 0 ? bidData[0].bidPrice : startingPrice
  
  // State for the user's bid amount
  const [bidAmount, setBidAmount] = useState(currentBid + 5)

  // Update bid amount when current bid changes
  useEffect(() => {
    setBidAmount(currentBid + 5)
  }, [currentBid])

  // Mutation to create a new bid
  const createBidMutation = useMutation({
    mutationFn: createBid,
    onSuccess: () => {
      // Refetch bids after successful bid
      queryClient.invalidateQueries({ queryKey: ['bids', listingId] })
      // Reset bid amount to next increment
      setBidAmount(bidAmount + 5)
    },
    onError: (error) => {
      console.error('Error placing bid:', error)
      alert('Failed to place bid. Please try again.')
    },
  })

  const handlePlaceBid = () => {
    if (!isAuthenticated) {
      alert('Please log in to place a bid')
      return
    }

    if (!dbUserId) {
      alert('User ID not found. Please try refreshing the page.')
      return
    }

    if (bidAmount <= currentBid) {
      alert('Your bid must be higher than the current bid')
      return
    }

    createBidMutation.mutate({
      userId: dbUserId,
      userListingId: listingId,
      bidPrice: bidAmount,
    })
  }

  const incrementBid = (amount: number) => {
    setBidAmount((prev) => prev + amount)
  }

  if (bidIsPending) {
    return <p className="text-white">Loading bids...</p>
  }

  if (bidError) {
    return <p className="text-white">Error loading bids</p>
  }

  // Get last few bids (excluding the current highest)
  const lastBids = bidData && bidData.length > 1 ? bidData.slice(1, 3) : []

  return (
    <div className="flex gap-8">
      {/* CURRENT BID PANEL */}
      <div className="w-64 space-y-4 rounded-none bg-hardware-graphite p-6 text-white">
        <p className="font-mono font-bold">Current Bid:</p>
        <p className="font-mono text-xl">${currentBid.toFixed(2)}</p>

        {lastBids.length > 0 && (
          <>
            <p className="font-mono font-bold">Last Bids:</p>
            {lastBids.map((bid) => (
              <p key={bid.bidId} className="font-mono">
                ${bid.bidPrice.toFixed(2)}
              </p>
            ))}
          </>
        )}

        {bidData && bidData.length === 0 && (
          <p className="font-mono text-sm text-hardware-white/70">
            No bids yet. Be the first to bid!
          </p>
        )}
      </div>

      {/* YOUR BID PANEL */}
      <div className="w-80 space-y-6 rounded-none bg-hardware-graphite p-6 text-white">
        <p className="font-mono font-bold">Your Bid:</p>

        <div className="flex gap-3">
          <Button
            onClick={() => incrementBid(5)}
            className="rounded-sm bg-hardware-mint px-4 py-2 font-mono text-sm text-hardware-charcoal"
          >
            + $5
          </Button>
          <Button
            onClick={() => incrementBid(10)}
            className="rounded-sm bg-hardware-mint px-4 py-2 font-mono text-sm text-hardware-charcoal"
          >
            + $10
          </Button>
          <Button
            onClick={() => incrementBid(20)}
            className="rounded-sm bg-hardware-mint px-4 py-2 font-mono text-sm text-hardware-charcoal"
          >
            + $20
          </Button>
        </div>

        <p className="font-mono text-3xl">${bidAmount.toFixed(2)}</p>

        <Button
          onClick={handlePlaceBid}
          disabled={createBidMutation.isPending || !isAuthenticated}
          className="rounded-sm bg-hardware-blue px-4 py-2 font-mono text-white disabled:opacity-50"
        >
          {createBidMutation.isPending ? 'Placing Bid...' : 'Place Bid'}
        </Button>

        {!isAuthenticated && (
          <p className="text-sm text-hardware-white/70">
            Please log in to place a bid
          </p>
        )}
      </div>
    </div>
  )
}

