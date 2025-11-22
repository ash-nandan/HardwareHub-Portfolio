import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import { useQuery } from '@tanstack/react-query'
import { checkClosedUserListings } from '../apis/listings'
import { Bell, BellDot, Menu } from 'lucide-react'
import { Link } from 'react-router'
import { useState } from 'react'

export default function NavBar() {
  const [notificationSeen, setNotificationSeen] = useState(false)
  const userId = 3

  const { data, isPending, error } = useQuery({
    queryKey: ['closedListings', userId],
    queryFn: async () => {
      return checkClosedUserListings(userId)
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
    <nav className="flex items-center justify-between bg-hardware-navy px-8 py-4 text-white shadow">
      <div className="flex justify-end space-x-6">
        <a
          href="/"
          className="mr-6 font-mono text-2xl font-semibold tracking-wide"
        >
          ⚙️ Hardware Hub
        </a>

        <div className="flex items-center gap-10 text-lg">
          <a href="/" className="transition hover:text-hardware-mint">
            Browse
          </a>
          <a
            href="/listings/create"
            className="transition hover:text-hardware-mint"
          >
            Create Listing
          </a>
        </div>
      </div>

      <div className="flex justify-end space-x-6">
        <DropdownMenu
          //onOpenChange works better with Dropdown instead of an onClick function
          onOpenChange={(isOpen) => {
            if (isOpen && !notificationSeen) {
              setNotificationSeen(true)
            }
          }}
        >
          <DropdownMenuTrigger className="focus:outline-none">
            {data.length > 0 && !notificationSeen ? (
              <BellDot className="text-hardware-mint" />
            ) : (
              <Bell />
            )}
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end" //align right edge
            sideOffset={4}
            className="mt-2 max-w-sm rounded-none border-b-2 border-hardware-mint p-0"
          >
            <div className="flex bg-hardware-charcoal px-4 py-2 font-sans text-xs text-hardware-white">
              {data.map((listing) => (
                <DropdownMenuItem
                  asChild
                  key={listing.listingId}
                  className="rounded-none p-2"
                >
                  <Link to={`/listings/${listing.listingId}`}>
                    {
                      <div className="space-y-2">
                        <p>{`Your auction for ${listing.itemName} has ended.`}</p>
                        <p className="flex justify-end">
                          {'Click to complete sale >'}
                        </p>
                      </div>
                    }
                  </Link>
                </DropdownMenuItem>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <div className="flex cursor-pointer items-center gap-3 bg-hardware-grey/90 px-4 py-3">
              <Avatar className="h-6 w-6 rounded-none border border-hardware-charcoal">
                <AvatarFallback className="rounded-none bg-hardware-white"></AvatarFallback>
              </Avatar>
              <span className="font-mono text-hardware-charcoal">username</span>
              <Menu className="text-hardware-charcoal" />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="mt-2 rounded-none p-0">
            <div className="flex flex-col space-y-6 border-b-2 border-hardware-mint bg-hardware-charcoal px-6 py-6 font-mono text-hardware-white">
              <DropdownMenuItem asChild className="rounded-none p-2">
                <Link to="/profile">View Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rounded-none p-2">
                <Link to="/mylistings">My Listings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rounded-none p-2">
                <Link to="/bids">My Bids</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-none p-2">
                Sign Out
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button className="flex cursor-pointer items-center gap-3 rounded-none bg-hardware-grey px-4 py-3 font-mono text-hardware-charcoal">
          Login / Sign up
        </Button>
      </div>
    </nav>
  )
}
