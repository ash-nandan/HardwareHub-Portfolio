import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import { Bell, Menu } from 'lucide-react'
import { Link } from 'react-router'

export default function NavBar() {
  return (
    <nav className="flex items-center justify-between bg-hardware-navy px-8 py-4 text-white shadow">
      <a href="/" className="font-mono text-2xl font-semibold tracking-wide">
        ⚙️ Hardware Hub
      </a>

      <div className="flex items-center gap-10 text-lg">
        <a href="/" className="transition hover:text-hardware-mint">
          Browse
        </a>
        <a href="/mylistings" className="transition hover:text-hardware-mint">
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
      </div>

      <Bell />

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

        <DropdownMenuContent className="mt-2 w-48 rounded-none p-0">
          <div className="space-y-6 bg-hardware-white px-6 py-6 font-mono text-hardware-charcoal">
            <DropdownMenuItem asChild className="rounded-none p-2">
              <Link to="/profile">View Profile</Link>
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
    </nav>
  )
}
