export interface Profile {
  id: number
  auth_id: string
  username: string
  first_name: string
  last_name: string
  email: string
  phone: string
  address_one: string
  address_two?: string | null
  town_city: string
  postcode: string
  image_url?: string | null
  created_at: string
  updated_at: string
}

export interface ProfilePatch {
  username: string
  firstName: string
  lastName: string
  email: string
  phone: string
  addressOne: string
  addressTwo: string
  townCity: string
  postcode: string
  imageUrl: string
}

export interface ProfileConfirmed {
  id: number
  username: string
}

export interface ProfileResponse {
  updatedUserId: number
}
