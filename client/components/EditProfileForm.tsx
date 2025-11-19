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
      className="space-y-4 rounded-lg bg-[##F3F6F9] p-8 text-[#2A2A32] shadow-lg"
    >
      <h2 className="font-mono text-2xl font-semibold text-[#0E2338]">
        Edit Profile
      </h2>
      <label htmlFor="text-sm font-semibold">First Name</label>
      <input
        name="first_name"
        value={form.first_name}
        onChange={handleChange}
        className="w-full rounded border border-[#D3D8DE] bg-[#F3F6F9] p-2 text-[#2A2A32]"
      />
      <label htmlFor="text-sm font-semibold">Last Name</label>
      <input
        name="last_name"
        value={form.last_name}
        onChange={handleChange}
        className="w-full rounded border border-[#D3D8DE] bg-[#F3F6F9] p-2 text-[#2A2A32]"
      />
      <label htmlFor="text-sm font-semibold">Phone</label>
      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        className="w-full rounded border border-[#D3D8DE] bg-[#F3F6F9] p-2 text-[#2A2A32]"
      />
      <label htmlFor="text-sm font-semibold">Address Line 1</label>
      <input
        name="address_one"
        value={form.address_one ?? ''}
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
