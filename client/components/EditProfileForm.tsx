import { useState } from 'react'
import { Profile } from '../../models/profile'

interface Props {
  profile: Profile
  onClose: () => void
  onUpdate: (data: Profile) => void
}

export default function EditProfileForm({ profile, onClose, onUpdate }: Props) {
  const [form, setForm] = useState(profile)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const res = await fetch(`/api/profile/${profile.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    const updatedProfile = await res.json()
    onUpdate(updatedProfile)
    onClose()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-1 rounded-lg bg-[##F3F6F9] p-8 text-[#2A2A32] shadow-lg"
    >
      <h2 className="font-mono text-2xl font-semibold text-[#F3F6F9]">
        Edit Profile
      </h2>{' '}
      <br></br>
      <label htmlFor="first_name" className="text-md font-mono text-[#F3F6F9]">
        First Name
      </label>
      <input
        name="first_name"
        value={form.first_name}
        onChange={handleChange}
        className="w-full rounded border border-[#D3D8DE] bg-[#F3F6F9] p-2 text-[#2A2A32]"
      />{' '}
      <br></br>
      <br></br>
      <label htmlFor="last_name" className="text-md font-mono text-[#F3F6F9]">
        Last Name
      </label>
      <input
        name="last_name"
        value={form.last_name}
        onChange={handleChange}
        className="w-full rounded border border-[#D3D8DE] bg-[#F3F6F9] p-2 text-[#2A2A32]"
      />
      <br></br>
      <br></br>
      <label htmlFor="phone" className="text-md font-mono text-[#F3F6F9]">
        Phone
      </label>
      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        className="w-full rounded border border-[#D3D8DE] bg-[#F3F6F9] p-2 text-[#2A2A32]"
      />
      <br></br>
      <br></br>
      <label htmlFor="address_one" className="text-md font-mono text-[#F3F6F9]">
        Address
      </label>
      <input
        name="address_one"
        value={form.address_one ?? ''}
        onChange={handleChange}
        className="w-full rounded border border-[#D3D8DE] bg-[#F3F6F9] p-2 text-[#2A2A32]"
      />
      <br></br>
      <br></br>
      <label htmlFor="town_city" className="text-md font-mono text-[#F3F6F9]">
        Town/City
      </label>
      <input
        name="town_city"
        value={form.town_city ?? ''}
        onChange={handleChange}
        className="w-full rounded border border-[#D3D8DE] bg-[#F3F6F9] p-2 text-[#2A2A32]"
      />
      <br></br>
      <br></br>
      <label htmlFor="postcode" className="text-md font-mono text-[#F3F6F9]">
        Postcode
      </label>
      <input
        name="postcode"
        value={form.postcode ?? ''}
        onChange={handleChange}
        className="w-full rounded border border-[#D3D8DE] bg-[#F3F6F9] p-2 text-[#2A2A32]"
      />
      <div className="flex gap-3 pt-4">
        <button className="rounded bg-[#1676FF] px-4 py-2 font-semibold text-[#F3F6F9] shadow hover:opacity-90">
          Save
        </button>
        <button
          type="button"
          onClick={onClose}
          className="rounded bg-[#3D3D45] px-4 py-2 font-semibold text-[#F3F6F9] hover:opacity-90"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
