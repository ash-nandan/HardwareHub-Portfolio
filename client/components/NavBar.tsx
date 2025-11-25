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
import { AvatarImage } from '@/components/ui/avatar'

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
          className="mr-6 font-mono text-3xl font-semibold tracking-wide"
        >
          ⚙️ Hardware Hub
        </a>

        <div className="flex items-center gap-8 text-lg">
          <a
            href="/listings"
            className="cursor-pointer rounded-none bg-hardware-grey px-4 py-2 font-mono text-sm text-hardware-charcoal"
          >
            Browse
          </a>

          {isAuthenticated && (
            <>
              <a
                href="/listings/create"
                className="cursor-pointer rounded-sm bg-hardware-blue px-4 py-2 font-mono text-sm text-hardware-white"
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
              <div className="bgnone flex cursor-pointer items-center gap-3 px-4 py-3">
                <Avatar className="h-10 w-10 rounded-full border border-none">
                  <AvatarImage
                    src={user?.picture}
                    alt="Profile picture"
                    className="rounded-full object-cover"
                  />
                  <AvatarFallback className="rounded-full bg-hardware-mint" />
                </Avatar>
                <Menu className="text-hardware-white" />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              sideOffset={4}
              className="mt-2 w-48 rounded-none p-0"
            >
              <div className="flex flex-col gap-4 bg-hardware-charcoal px-6 py-6 font-mono text-sm text-hardware-white">
                <DropdownMenuItem
                  asChild
                  className="block w-full rounded-none px-0 py-2 hover:bg-hardware-sky/20"
                >
                  <Link to="/profile">View Profile</Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  asChild
                  className="block w-full rounded-none px-0 py-2 hover:bg-hardware-sky/20"
                >
                  <Link to="/mylistings">My Listings</Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  asChild
                  className="block w-full rounded-none px-0 py-2 hover:bg-hardware-sky/20"
                >
                  <Link to="/bids">My Bids</Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="block w-full rounded-none px-0 py-2 shadow-none hover:bg-hardware-sky/20">
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
