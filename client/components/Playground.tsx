import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export default function Playground() {
  return (
    <div className="text-hardware-charcoal bg-hardware-navy min-h-screen space-y-24 p-10 font-sans">
      {/* ---------------------------------------- */}
      {/* ---------------- NAVBAR ---------------- */}
      {/* ---------------------------------------- */}

      <section className="space-y-6">
        <h2 className="font-mono text-xl text-white">Navbar</h2>

        <div className="bg-hardware-navy border-hardware-graphite flex w-full items-center justify-between border-b px-6 py-4 text-white">
          {/* LEFT - CREATE LISTING (only should show when signed in */}
          <div className="w-1/3">
            <Button className="bg-hardware-grey text-hardware-charcoal flex cursor-pointer items-center gap-3 rounded-none px-4 py-3 font-mono">
              Create Listing
            </Button>
          </div>

          {/* CENTER — HARDWARE HUB */}
          <div className="flex w-1/3 justify-center">
            <span className="font-mono text-xl tracking-wide">
              HARDWARE HUB
            </span>
          </div>

          {/* RIGHT - USER DROPDOWN (only when signed in)*/}
          <div className="flex w-1/3 items-center justify-end gap-4">
            <Button className="text-white">Log In</Button>

            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <div className="bg-hardware-grey flex cursor-pointer items-center gap-3 px-4 py-3">
                  <Avatar className="border-hardware-charcoal h-10 w-10 rounded-none border-2">
                    <AvatarFallback className="bg-hardware-white rounded-none"></AvatarFallback>
                  </Avatar>
                  <span className="text-hardware-charcoal font-mono">
                    username
                  </span>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="mt-2 w-48 rounded-none p-0">
                <div className="bg-hardware-white text-hardware-charcoal space-y-6 px-6 py-6 font-mono">
                  <DropdownMenuItem className="rounded-none p-2">
                    View Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-none p-2">
                    My Listings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-none p-2">
                    My Bids
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-none p-2">
                    Sign Out
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </section>

      {/* -------------------------------------------- */}
      {/* ---------------- SEARCH BAR ---------------- */}
      {/* -------------------------------------------- */}

      <section className="space-y-6">
        <h2 className="font-mono text-xl text-white">Search Bar</h2>

        <div className="bg-hardware-sky flex items-center justify-center gap-6 px-8 py-6">
          <span className="text-hardware-charcoal font-mono">Search</span>

          <Select>
            <SelectTrigger className="bg-hardware-white text-hardware-charcoal w-80 rounded-none pl-3">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-hardware-white text-hardware-charcoal w-[var(--radix-select-trigger-width)] rounded-none pl-3">
              <SelectItem value="cpu">CPU</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="bg-hardware-white text-hardware-charcoal w-80 rounded-none pl-3">
              <SelectValue placeholder="Condition" />
            </SelectTrigger>
            <SelectContent className="bg-hardware-white text-hardware-charcoal w-[var(--radix-select-trigger-width)] rounded-none pl-3">
              <SelectItem value="used" className="rounded-none">
                Used
              </SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Keywords"
            className="bg-hardware-white text-hardware-charcoal text-md w-96 rounded-none p-1"
          />

          <span className="text-2xl">🔍</span>
        </div>
      </section>

      {/* --------------------------------------------------- */}
      {/* ---------------- LISTING INFO CARD ---------------- */}
      {/* --------------------------------------------------- */}

      <section className="space-y-6">
        <h2 className="font-mono text-xl text-white">Listing Info Card</h2>

        <div className="bg-hardware-white max-w-md rounded-none p-6">
          <h3 className="mb-4 font-mono text-lg">
            Intel Core i5-11400F Processor
          </h3>

          <p className="text-sm">Condition: Used</p>
          <p className="mb-4 text-sm">Starting Price: $180.00</p>

          <p className="text-sm">
            Category: <span className="font-semibold">CPU</span>
          </p>

          <Button className="bg-hardware-charcoal mt-6 rounded-sm px-4 py-2 text-sm text-white">
            Delete Listing
          </Button>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* ---------------- DESCRIPTION CARD ---------------- */}
      {/* -------------------------------------------------- */}

      <section className="space-y-6">
        <h2 className="font-mono text-xl text-white">Description Card</h2>

        <div className="bg-hardware-white max-w-xl rounded-none p-6">
          <p className="mb-4 font-mono font-bold">Description:</p>

          <p className="text-hardware-charcoal">
            Six-core Intel Core i5-11400F pulled from a working gaming build...
          </p>
        </div>
      </section>

      {/* -------------------------------------------- */}
      {/* ---------------- BID PANELS ---------------- */}
      {/* -------------------------------------------- */}

      <section className="space-y-6">
        <h2 className="font-mono text-xl text-white">Bid Panels</h2>

        <div className="flex gap-8">
          {/* CURRENT BID */}
          <div className="bg-hardware-graphite w-64 space-y-4 rounded-none p-6 text-white">
            <p className="font-mono font-bold">Current Bid:</p>
            <p className="font-mono text-xl">$250.00</p>

            <p className="font-mono font-bold">Last Bids:</p>
            <p className="font-mono">$230.00</p>
            <p className="font-mono">$195.00</p>
          </div>

          {/* YOUR BID */}
          <div className="bg-hardware-graphite w-80 space-y-6 rounded-none p-6 text-white">
            <p className="font-mono font-bold">Your Bid:</p>

            <div className="flex gap-3">
              <Button className="bg-hardware-mint text-hardware-charcoal rounded-sm px-4 py-2 font-mono text-sm">
                + $5
              </Button>
              <Button className="bg-hardware-mint text-hardware-charcoal rounded-sm px-4 py-2 font-mono text-sm">
                + $10
              </Button>
              <Button className="bg-hardware-mint text-hardware-charcoal rounded-sm px-4 py-2 font-mono text-sm">
                + $20
              </Button>
            </div>

            <p className="font-mono text-3xl">$255.00</p>

            <Button className="bg-hardware-blue rounded-sm px-4 py-2 font-mono text-white">
              Place Bid
            </Button>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* ---------------- ADD LISTING FORM ---------------- */}
      {/* -------------------------------------------------- */}

      <section className="space-y-6">
        <h2 className="font-mono text-xl text-white">Add Listing Panels</h2>

        <div className="space-y-8">
          {/* FILL DETAILS */}
          <div className="bg-hardware-blue max-w-lg space-y-6 rounded-none p-8 text-white">
            <h3 className="mb-4 text-center font-mono text-xl">
              1. Fill in details
            </h3>

            <div>
              <Label>Category</Label>
              <Select>
                <SelectTrigger className="bg-hardware-white text-hardware-charcoal mt-1 w-80 rounded-none pl-3">
                  <SelectValue placeholder="Choose one" />
                </SelectTrigger>
                <SelectContent className="bg-hardware-white text-hardware-charcoal w-[var(--radix-select-trigger-width)] rounded-none pl-3">
                  <SelectItem value="cpu" className="rounded-none">
                    CPU
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Condition</Label>
              <Select>
                <SelectTrigger className="bg-hardware-white text-hardware-charcoal mt-1 w-80 rounded-none pl-3">
                  <SelectValue placeholder="Choose one" />
                </SelectTrigger>
                <SelectContent className="bg-hardware-white text-hardware-charcoal w-[var(--radix-select-trigger-width)] rounded-none pl-3">
                  <SelectItem value="used" className="rounded-none">
                    Used
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                placeholder="Write a brief description..."
                className="bg-hardware-white text-hardware-charcoal mt-1 h-40 rounded-none p-2"
              />
            </div>
          </div>

          {/* IMAGE UPLOAD & IMPORTANT INFO */}
          <div className="space-y-8">
            {/* Image Upload */}
            <div className="bg-hardware-white max-w-lg space-y-4 rounded-none p-6">
              <h3 className="text-hardware-charcoal font-mono text-lg">
                2. Image Upload
              </h3>
              <p className="text-hardware-charcoal">
                Upload a photo for your listing
              </p>

              <Button className="bg-hardware-graphite rounded-sm px-4 py-2 font-mono text-white">
                Choose File
              </Button>

              <div className="border-hardware-graphite text-hardware-graphite flex h-40 w-60 items-center justify-center rounded-none border">
                Image Preview
              </div>
            </div>

            {/* Important Info */}
            <div className="bg-hardware-graphite max-w-lg space-y-6 rounded-none p-6 text-white">
              <h3 className="font-mono text-lg">3. Important Info</h3>

              <ul className="space-y-2">
                <li>• Auctions run for five days from posting</li>
                <li>• Listings are subject to Terms & Conditions</li>
              </ul>

              <div className="flex items-center gap-4 pt-4">
                <input type="checkbox" className="h-5 w-5" />
                <span>I understand & agree</span>

                <Button className="bg-hardware-blue ml-auto rounded-sm px-4 py-2 font-mono text-white">
                  Add Listing
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* ---------------- PERSONAL DETAILS ---------------- */}
      {/* -------------------------------------------------- */}

      <section className="space-y-12">
        <h2 className="font-mono text-xl text-white">Personal Details</h2>

        {/* VIEW/EDIT PROFILE */}
        <div className="bg-hardware-blue max-w-lg space-y-6 rounded-none p-10 text-white">
          <h3 className="text-center font-mono text-2xl">Personal Details</h3>

          <div className="space-y-6">
            <div>
              <p className="font-semibold">Username</p>
              <p>techwizard42</p>
            </div>

            <div>
              <p className="font-semibold">Full Name</p>
              <p>Aiden Lowe</p>
            </div>

            <div>
              <p className="font-semibold">Email Address</p>
              <p>aiden.lowe@example.com</p>
            </div>

            <div>
              <p className="font-semibold">Phone Number</p>
              <p>0213456789</p>
            </div>

            <div>
              <p className="font-semibold">Address</p>
              <p>12 Falcon Ridge</p>
              <p>Hamilton</p>
              <p>3216</p>
            </div>
          </div>

          <Button className="bg-hardware-white text-hardware-charcoal ml-auto block rounded-sm px-6 py-3 font-semibold">
            Edit Profile
          </Button>
        </div>

        {/* SIGNUP FORM */}
        <div className="bg-hardware-blue max-w-lg space-y-6 rounded-none p-10 text-white">
          <h3 className="text-center font-mono text-2xl">Personal Details</h3>

          <div className="space-y-6">
            <div>
              <p className="font-semibold">Username</p>
              <Input
                placeholder="placeholder"
                className="bg-hardware-white text-hardware-charcoal w-60 rounded-none pl-1 "
              />
            </div>

            <div>
              <p className="font-semibold">Full Name</p>
              <Input
                placeholder="placeholder"
                className="bg-hardware-white text-hardware-charcoal w-60 rounded-none pl-1"
              />
            </div>

            <div>
              <p className="font-semibold">Email Address</p>
              <Input
                placeholder="placeholder"
                className="bg-hardware-white text-hardware-charcoal w-60 rounded-none pl-1 "
              />
            </div>

            <div>
              <p className="font-semibold">Phone Number</p>
              <Input
                placeholder="placeholder"
                className="bg-hardware-white text-hardware-charcoal w-60 rounded-none pl-1 "
              />
            </div>

            <div>
              <p className="font-semibold">Address</p>

              <Input
                placeholder="placeholder"
                className="bg-hardware-white text-hardware-charcoal mb-2 w-60 rounded-none pl-1"
              />
              <Input
                placeholder="placeholder"
                className="bg-hardware-white text-hardware-charcoal mb-2 w-60 rounded-none pl-1"
              />
              <Input
                placeholder="placeholder"
                className="bg-hardware-white text-hardware-charcoal mb-2 w-60 rounded-none pl-1"
              />
              <Input
                placeholder="placeholder"
                className="bg-hardware-white text-hardware-charcoal mb-2 w-60 rounded-none pl-1"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
