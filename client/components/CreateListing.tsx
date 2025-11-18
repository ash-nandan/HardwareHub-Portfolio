import { useQueryClient, useMutation } from '@tanstack/react-query'
import { NewListingData } from '../../models/listings'
import { createNewLisitng } from '../apis/listings'
import { useState, ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'

export function CreateListing() {
  const [formData, setFormData] = useState<NewListingData>({
    itemName: '',
    itemDescription: '',
    itemImage: '',
    startingPrice: 0,
    categoryId: 0,
    conditionId: 0,
    userId: 1, // hardcoded till auth is done
  })

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const createListingMutation = useMutation({
    mutationFn: createNewLisitng,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings'] })
    },
  })

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'startingPrice' ||
        name === 'categoryId' ||
        name === 'conditionId'
          ? Number(value)
          : value,
    }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    createListingMutation.mutate(formData, {
      onSuccess: (data) => {
        navigate('/listings/' + data.listingId)
      },
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="itemName"
        value={formData.itemName}
        onChange={handleChange}
        placeholder="Item Name"
        required
      />
      <textarea
        name="itemDescription"
        value={formData.itemDescription}
        onChange={handleChange}
        placeholder="Item Description"
        required
      ></textarea>
      <input
        type="text"
        name="itemImage"
        value={formData.itemImage}
        onChange={handleChange}
        placeholder="Item Image URL"
        required
      />
      <input
        type="number"
        name="startingPrice"
        value={formData.startingPrice}
        onChange={handleChange}
        placeholder="Starting Price"
        required
      />
      <select
        name="categoryId"
        value={formData.categoryId}
        onChange={handleChange}
        required
      >
        <option value="">Select Category</option>
        <option value="1">CPU</option>
        <option value="2">GPU</option>
        <option value="3">Ram</option>
        <option value="4">Fans</option>
        <option value="5">Storage</option>
        <option value="6">Case</option>
        <option value="7">Peripheral</option>
      </select>
      <select
        name="conditionId"
        value={formData.conditionId}
        onChange={handleChange}
        required
      >
        <option value="">Select Condition</option>
        <option value="1">New</option>
        <option value="2">Like New</option>
        <option value="3">used</option>
      </select>
      <Button type="submit">Create Your Listing</Button>
    </form>
  )
}
