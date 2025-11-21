export default function NavBar() {
  return (
    <nav className="flex items-center justify-between bg-hardware-sky px-8 py-4 text-white shadow">
      <a href="/" className="text-2xl font-semibold tracking-wide">
        Hardware Hub
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

      <a
        href="/login"
        className="rounded-sm bg-hardware-mint px-5 py-2 font-semibold text-white transition hover:bg-hardware-charcoal/80"
      >
        Login / Sign Up
      </a>
    </nav>
  )
}
