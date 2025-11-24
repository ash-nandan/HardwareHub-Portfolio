import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ProfilePatch } from 'models/profile'
import { useState } from 'react'

export function Signup() {
  //by making a state object and assigning keys as 'name' state can be handled in a DRY way
  const [form, setForm] = useState<ProfilePatch>({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    addressOne: '',
    addressTwo: '',
    townCity: '',
    postcode: '',
    imageUrl: '',
  })

  //name = singles out name value of form, value is the typed info
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target

    //keep all existing values (prev) and update the name and value changed
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  //grouped required fields to make DRY, reminder trim() stops blank spaces
  const formComplete =
    form.firstName.trim() &&
    form.lastName.trim() &&
    form.email.trim() &&
    form.addressOne.trim() &&
    form.townCity.trim() &&
    form.postcode.trim()

  return (
    <div className="mt-12 flex flex-col items-center justify-center gap-10 p-4 md:flex-row">
      <div className="w-full max-w-lg space-y-6 rounded-none bg-hardware-blue p-10 text-white">
        <h3 className="mb-6 text-center font-mono text-2xl">
          Complete your profile
        </h3>

        <div className="space-y-6 text-sm">
          <div className="space-y-1">
            <label htmlFor="username" className="font-semibold">
              Username
            </label>
            <Input
              id="username"
              name="username"
              placeholder="username"
              onChange={handleChange}
              className="w-full max-w-xs rounded-none bg-hardware-white pl-1 text-hardware-charcoal"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="firstName" className="font-semibold">
              First Name *
            </label>
            <Input
              id="firstName"
              name="firstName"
              placeholder="first name"
              onChange={handleChange}
              className="w-full max-w-xs rounded-none bg-hardware-white pl-1 text-hardware-charcoal"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="lastName" className="font-semibold">
              Last Name *
            </label>
            <Input
              id="lastName"
              name="lastName"
              placeholder="last name"
              onChange={handleChange}
              className="w-full max-w-xs rounded-none bg-hardware-white pl-1 text-hardware-charcoal"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="font-semibold">
              Email Address *
            </label>
            <Input
              id="email"
              name="email"
              placeholder="email address"
              onChange={handleChange}
              className="w-full max-w-xs rounded-none bg-hardware-white pl-1 text-hardware-charcoal"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="phone" className="font-semibold">
              Phone Number
            </label>
            <Input
              id="phone"
              name="phone"
              placeholder="phone number/mobile (optional)"
              onChange={handleChange}
              className="w-full max-w-xs rounded-none bg-hardware-white pl-1 text-hardware-charcoal"
            />
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <label htmlFor="addressOne" className="font-semibold">
                Address Line 1 *
              </label>
              <Input
                id="addressOne"
                name="addressOne"
                placeholder="Address line 1"
                onChange={handleChange}
                className="w-full max-w-xs rounded-none bg-hardware-white pl-1 text-hardware-charcoal"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="addressTwo" className="font-semibold">
                Address Line 2
              </label>
              <Input
                id="addressTwo"
                name="addressTwo"
                placeholder="Address line 2 (optional)"
                onChange={handleChange}
                className="w-full max-w-xs rounded-none bg-hardware-white pl-1 text-hardware-charcoal"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="townCity" className="font-semibold">
                Town/City *
              </label>
              <Input
                id="townCity"
                name="townCity"
                placeholder="town/city"
                onChange={handleChange}
                className="w-full max-w-xs rounded-none bg-hardware-white pl-1 text-hardware-charcoal"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="postcode" className="font-semibold">
                Postcode *
              </label>
              <Input
                id="postcode"
                name="postcode"
                placeholder="postcode"
                onChange={handleChange}
                className="w-full max-w-xs rounded-none bg-hardware-white pl-1 text-hardware-charcoal"
              />
            </div>

            <p className="mt-4 text-sm">* Required fields</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-lg">
        <div className="space-y-4 rounded-none bg-hardware-white p-6">
          <h3 className="font-mono text-lg text-hardware-charcoal">
            2. Image Upload
          </h3>
          <p className="text-hardware-charcoal">
            Upload a photo for your listing
          </p>

          <Button className="rounded-sm bg-hardware-graphite px-4 py-2 font-mono text-white">
            Choose File
          </Button>

          <div className="flex h-40 w-full max-w-xs items-center justify-center rounded-none border border-hardware-graphite text-hardware-graphite">
            Image Preview
          </div>
        </div>

        <div className="mt-6 flex w-full justify-end">
          <Button
            disabled={!formComplete}
            className="
            rounded-sm bg-hardware-mint px-4 py-2 font-mono text-hardware-charcoal
            hover:bg-hardware-mint/80
            disabled:bg-hardware-mint/40
            disabled:text-hardware-charcoal/40
          "
          >
            Save Profile
          </Button>
        </div>
      </div>
    </div>
  )
}
