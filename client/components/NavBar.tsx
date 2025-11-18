export default function NavBar() {
  return (
    <nav className="bg-hardware-sky flex items-center justify-between px-8 py-4 text-white shadow">
      <a href="/" className="text-2xl font-semibold tracking-wide">
        Hardware Hub
      </a>

      <div className="flex items-center gap-10 text-lg">
        <a href="/" className="hover:text-hardware-mint transition">
          Browse
        </a>
        <a href="/dashboard" className="hover:text-hardware-mint transition">
          My Listings
        </a>
        <a href="/bids" className="hover:text-hardware-mint transition">
          My Bids
        </a>
        <a
          href="/listings/create"
          className="hover:text-hardware-mint transition"
        >
          Create Listing
        </a>
      </div>

      <a
        href="/login"
        className="bg-hardware-mint hover:bg-hardware-charcoal/80 rounded-sm px-5 py-2 font-semibold text-white transition"
      >
        Login / Sign Up
      </a>
    </nav>
  )
}
