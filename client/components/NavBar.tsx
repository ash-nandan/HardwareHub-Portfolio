import { Button } from '@/components/ui/button'

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

      <Button className="flex cursor-pointer items-center gap-3 rounded-none bg-hardware-grey px-4 py-3 font-mono text-hardware-charcoal">
        Login / Sign up
      </Button>
    </nav>
  )
}
