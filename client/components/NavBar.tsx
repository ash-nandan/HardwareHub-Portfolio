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
    <nav className="4 bg-hardware-navy text-white shadow">
      <div className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left side: brand + desktop nav + mobile hamburger */}
        <div className="flex items-center gap-4">
          {/* Mobile hamburger menu */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center focus:outline-none md:hidden">
              <Menu className="h-6 w-6 text-hardware-white" />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="start"
              sideOffset={8}
              className="mt-2 w-52 rounded-none bg-hardware-charcoal p-0 text-sm text-hardware-white"
            >
              <div className="flex flex-col gap-2 px-4 py-4 font-mono">
                <DropdownMenuItem
                  asChild
                  className="rounded-none px-0 py-2 hover:bg-hardware-sky/20"
                >
                  <Link to="/listings">Browse</Link>
                </DropdownMenuItem>

                {isAuthenticated && (
                  <>
                    <DropdownMenuItem
                      asChild
                      className="rounded-none px-0 py-2 hover:bg-hardware-sky/20"
                    >
                      <Link to="/listings/create">Create Listing</Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      asChild
                      className="rounded-none px-0 py-2 hover:bg-hardware-sky/20"
                    >
                      <Link to="/mylistings">My Listings</Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      asChild
                      className="rounded-none px-0 py-2 hover:bg-hardware-sky/20"
                    >
                      <Link to="/bids">My Bids</Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="rounded-none px-0 py-2 hover:bg-hardware-sky/20">
                      <Link to="/profile">View Profile</Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="rounded-none px-0 py-2 hover:bg-hardware-sky/20">
                      <SignOutButton />
                    </DropdownMenuItem>
                  </>
                )}

                {!isAuthenticated && (
                  <DropdownMenuItem className="rounded-none px-0 py-2 hover:bg-hardware-sky/20">
                    <LoginButton />
                  </DropdownMenuItem>
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Brand */}
          <Link
            to="/"
            className="font-mono text-2xl font-semibold tracking-wide sm:text-3xl"
          >
            ⚙️ Hardware Hub
          </Link>

          {/* Desktop nav links(hidden on mobile) */}
          <div className="hidden items-center gap-6 md:flex">
            <Link
              to="/listings"
              className="cursor pointer rounded-none bg-hardware-grey px-4 py-2 font-mono text-sm text-hardware-charcoal"
            >
              Browse
            </Link>

            {isAuthenticated && (
              <Link
                to="/listings/create"
                className="cursor pointer rounded-sm bg-hardware-blue px-4 py-2 font-mono text-sm text-hardware-white"
              >
                Create Listing
              </Link>
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
                className="mt-2 max-w-sm rounded-none border-b-2 border-hardware-mint bg-hardware-charcoal text-sm text-hardware-white shadow-2xl "
              >
                <div className="px-4 py-2">
                  {data.length > 0 ? (
                    data.map((listing) => (
                      <DropdownMenuItem
                        asChild
                        key={listing.listingId}
                        className="rounded-none p-2 hover:bg-hardware-sky/20"
                      >
                        <Link to={`/listings/${listing.listingId}`}>
                          <div className="space-y-2">
                            <p>
                              Your auction for {listing.itemName} has ended.
                            </p>
                            <p className="flex justify-end text-xs">
                              Click to complete sale &gt;
                            </p>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <p className="p-2 text-xs">No notifications</p>
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {isLoading ? (
            <div className="h-10 w-24 animate-pulse rounded bg-hardware-grey/50 sm:w-32"></div>
          ) : isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <div className="flex cursor-pointer items-center gap-3 px-2 py-2 sm:py-3">
                  <Avatar className="h-9 w-9 rounded-full border-none sm:h-10 sm:w-10">
                    <AvatarImage
                      src={user?.picture}
                      alt="Profile picture"
                      className="h-full w-full rounded-full object-cover"
                    />
                    <AvatarFallback className="rounded-full bg-hardware-mint" />
                  </Avatar>
                  <Menu className="hidden h-5 w-5 text-hardware-white sm:h-6 sm:w-6 md:flex" />
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                sideOffset={4}
                className="mt-2 hidden w-48 rounded-none bg-hardware-charcoal p-0 font-mono text-sm text-hardware-white md:flex"
              >
                <div className="flex flex-col gap-3 px-6 py-6">
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
      </div>
    </nav>
  )
}
