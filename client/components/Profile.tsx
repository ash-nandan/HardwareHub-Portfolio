import { useState, useEffect } from 'react'
import { Profile } from '../../models/profile'

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const userId = 1

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(`/api/profile/${userId}`)
        if (!res.ok) {
          console.error('Failed to load profile')
          return
        }
        const data: Profile = await res.json()
        setProfile(data)
      } catch (err) {
        console.error('Error fetching profile', err)
      }
    }
    fetchProfile()
  }, [userId])

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0E2338] text-[#F3F6F9]">
        <p>Loading profile...</p>
      </div>
    )
  }

  const fullName = `${profile.first_name} ${profile.last_name}`
  const address = [
    profile.address_one,
    profile.address_two,
    profile.town_city,
    profile.postcode,
  ]
    .filter(Boolean)
    .join('\n')

  return (
    <div className="flex min-h-screen justify-center bg-[#0E2338] text-[#F3F6F9]">
      <main className="w-full max-w-5xl px-6 py-10">
        <h1 className="mb-10 text-center font-mono text-3xl">My Profile</h1>

        <div className="grid gap-10 md:grid-cols-2">
          <section className="max-w-lg rounded-xl bg-[#1676FF] px-8 py-10 shadow-lg">
            <h2 className="mb-6 text-center text-lg font-semibold tracking-wide">
              Personal Details
            </h2>

            <div className="space-y-4 text-sm">
              <DetailRow label="Username" value={profile.username} />
              <DetailRow label="Full Name" value={fullName} />
              <DetailRow label="Email Address" value={profile.email} />
              <DetailRow label="Phone Number" value={profile.phone} />
              <DetailRow label="Address" value={address} multiline />
            </div>

            <div className="mt-8 flex justify-end">
              <button className="rounded-md bg-[#F3F6F9] px-4 py-2 text-sm font-medium text-[#2A2A32] shadow-sm hover:bg-[#D3D8DE]">
                Edit Profile
              </button>
            </div>
          </section>
          <ProfilePictureCard imageUrl={profile.image_url} />
        </div>
      </main>
    </div>
  )
}

interface DetailRowProps {
  label: string
  value: string
  multiline?: boolean
}

function DetailRow({ label, value, multiline = false }: DetailRowProps) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide">{label}</p>
      {multiline ? (
        <pre className="whitespace-pre-wrap text-sm leading-snug">{value}</pre>
      ) : (
        <p className="text-sm leading-snug">{value}</p>
      )}
    </div>
  )
}

interface ProfilePictureCardProps {
  imageUrl?: string | null
}

function ProfilePictureCard({ imageUrl }: ProfilePictureCardProps) {
  const hasImage = Boolean(imageUrl)

  return (
    <section className="rounded-xl bg-[#F3F6F9] px-8 py-10 text-[#2A2A32] shadow-lg">
      <h2 className="mb-2 text-lg font-semibold tracking-wide">
        Profile Picture
      </h2>
      <p className="mb-4 text-sm">Upload Profile Picture</p>

      <label className="inline-block cursor-pointer rounded-md bg-[#2A2A32] px-4 py-2 text-sm font-medium text-[#F3F6F9] hover:bg-[#3D3D45]">
        Choose File
        <input type="file" className="hidden" />
      </label>
      <div className="mt-6 flex items-center justify-center">
        <div className="flex h-40 w-32 items-center justify-center border border-[#D3D8DE] bg-[#F3F6F9] text-xs text-[#3D3D45]">
          {hasImage ? (
            <img
              src={`/uploads/${imageUrl}`}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          ) : (
            <span>Image Preview</span>
          )}
        </div>
      </div>
    </section>
  )
}
