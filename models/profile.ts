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
