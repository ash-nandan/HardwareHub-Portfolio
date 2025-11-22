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
import { useAuth } from '../hooks/authHooks'
import LoginButton from './LoginButton'
import SignOutButton from './SignOutButton'
import { useState } from 'react'

export default function NavBar() {
  const { isAuthenticated, user, isLoading, getUserId } = useAuth()
  const [notificationSeen, setNotificationSeen] = useState(false)

  const userId = getUserId()

  const { data = [] } = useQuery({
    queryKey: ['closedListings', userId],
    queryFn: () => checkClosedUserListings(userId!),
    enabled: isAuthenticated && !!userId,
  })

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

          {isAuthenticated && (
            <>
              <a
                href="/mylistings"
                className="transition hover:text-hardware-mint"
              >
                My Listings
              </a>

              <a href="/bids" className="transition hover:text-hardware-mint">
                My Bids
              </a>

              <a
                href="/listings/create"
                className="transition hover:text-hardware-mint"
              >
                Create Listing
              </a>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center justify-end space-x-6">
        {isAuthenticated && (
          <DropdownMenu
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
              align="end"
              sideOffset={4}
              className="text-md mt-2 max-w-sm rounded-none border-b-2 border-hardware-mint shadow-2xl"
            >
              <div className="bg-hardware-charcoal px-4 py-2 font-sans text-sm text-hardware-white">
                {data.length > 0 ? (
                  data.map((listing) => (
                    <DropdownMenuItem
                      asChild
                      key={listing.listingId}
                      className="rounded-none p-2"
                    >
                      <Link to={`/listings/${listing.listingId}`}>
                        <div className="space-y-2">
                          <p>Your auction for {listing.itemName} has ended.</p>
                          <p className="flex justify-end">
                            Click to complete sale &gt;
                          </p>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  ))
                ) : (
                  <p className="p-2">No notifications</p>
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {isLoading ? (
          <div className="h-10 w-32 animate-pulse bg-hardware-grey/50"></div>
        ) : isAuthenticated && user ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <div className="flex cursor-pointer items-center gap-3 bg-hardware-grey/90 px-4 py-3">
                <Avatar className="h-6 w-6 rounded-none border border-hardware-charcoal">
                  <AvatarFallback className="rounded-none bg-hardware-white"></AvatarFallback>
                </Avatar>
                <span className="font-mono text-hardware-charcoal">
                  {user.name}
                </span>
                <Menu className="text-hardware-charcoal" />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="mt-2 w-48 rounded-none p-0">
              <div className="space-y-6 bg-hardware-white px-6 py-6 font-mono text-hardware-charcoal">
                <DropdownMenuItem asChild className="rounded-none p-2">
                  <Link to="/profile">View Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-none p-2">
                  <SignOutButton />
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <LoginButton />
        )}
      </div>
    </nav>
  )
}
