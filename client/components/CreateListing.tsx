import { useQueryClient, useMutation } from '@tanstack/react-query'
import { NewListingData } from '../../models/listings'
import { createNewLisitng } from '../apis/listings'
import { useState, ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowLeft } from 'lucide-react'
import { useAuth } from '../hooks/authHooks'
import { useRequireAuth } from '../hooks/requireAuth'

export function CreateListing() {
  const { getUserId } = useAuth()
  const { isLoading: authLoading, isAuthenticated } = useRequireAuth()

  const [formData, setFormData] = useState<NewListingData>({
    item_name: '',
    item_description: '',
    item_image: '',
    starting_price: 0,
    category_id: 0,
    condition_id: 0,
    user_id: 1,
  })

  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [imageSource, setImageSource] = useState<'upload' | 'Preset'>('upload')

  const userId = getUserId()

  const presetImages = [
    '/images-listings/listing1.jpg',
    '/images-listings/listing2.jpg',
    '/images-listings/listing3.jpg',
    '/images-listings/listing4.jpg',
    '/images-listings/listing5.jpg',
    '/images-listings/listing6.jpg',
  ]

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const createListingMutation = useMutation({
    mutationFn: createNewLisitng,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings'] })
    },
  })

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'starting_price' ? Number(value) : value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: Number(value),
    }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!agreedToTerms) {
      alert('Please agree to the terms and conditions')
      return
    }

    createListingMutation.mutate(
      {
        ...formData,
        user_id: userId || 1,
      },
      {
        onSuccess: () => {
          navigate('/')
        },
      },
    )
  }
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          item_image: reader.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePresetImageSelect = async (imagePath: string) => {
    console.log('1. Selected path:', imagePath)
    try {
      const response = await fetch(imagePath)
      console.log('2. Fetch response:', response.ok)
      const blob = await response.blob()
      console.log('3. Blob size:', blob.size)

      const reader = new FileReader()
      reader.onloadend = () => {
        console.log('4. Base64 length:', (reader.result as string).length)
        console.log(
          '5. Base64 preview:',
          (reader.result as string).substring(0, 50),
        )
        setFormData((prev) => ({
          ...prev,
          item_image: reader.result as string,
        }))
      }
      reader.readAsDataURL(blob)
    } catch (error) {
      console.error('Error selecting preset image:', error)
    }
  }

  if (authLoading) {
    return <p className="mt-8 text-center text-white">Loading...</p>
  }

  if (!isAuthenticated) {
    return (
      <p className="mt-8 text-center text-white">
        You must be logged in to create a listing.
      </p>
    )
  }

  return (
    <section className="py-8">
      <div className="mx-auto max-w-5xl space-y-6 px-4 sm:px-0">
        <h1 className="py-8 text-center font-mono text-3xl text-white">
          Create Your Listing
        </h1>
        <Button
          onClick={() => navigate('/listings')}
          variant="ghost"
          className="m-5 flex text-3xl text-hardware-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          <p className="font-mono text-sm">Back to Listings</p>
        </Button>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="flex flex-col space-y-6 rounded-none bg-hardware-blue p-8 text-white">
              <h2 className="mb-4 text-center font-mono text-xl">
                1. Fill in details
              </h2>

              <div>
                <Label htmlFor="item_name">Item Name</Label>
                <input
                  type="text"
                  id="item_name"
                  value={formData.item_name}
                  onChange={handleChange}
                  placeholder="Enter item name"
                  className="mt-1 w-full rounded-none bg-hardware-white p-2 text-hardware-charcoal"
                  required
                />
              </div>

              <div>
                <Label htmlFor="starting_price">Listing Price</Label>
                <input
                  type="number"
                  id="starting_price"
                  value={formData.starting_price}
                  onChange={handleChange}
                  placeholder="Enter starting price"
                  className="mt-1 w-full rounded-none bg-hardware-white p-2 text-hardware-charcoal"
                  required
                />
              </div>

              <div>
                <Label id="category_label" htmlFor="category_select">
                  Category
                </Label>
                <Select
                  value={formData.category_id.toString()}
                  onValueChange={(value) =>
                    handleSelectChange('category_id', value)
                  }
                >
                  <SelectTrigger
                    id="category_select"
                    aria-labelledby="category_label"
                    className="mt-1 w-full rounded-none bg-hardware-white pl-3 text-hardware-charcoal"
                  >
                    <SelectValue placeholder="Choose one" />
                  </SelectTrigger>

                  <SelectContent className="w-[var(--radix-select-trigger-width)] rounded-none bg-hardware-white pl-3 text-hardware-charcoal">
                    <SelectItem value="1" className="rounded-none">
                      CPU
                    </SelectItem>
                    <SelectItem value="2" className="rounded-none">
                      GPU
                    </SelectItem>
                    <SelectItem value="3" className="rounded-none">
                      Ram
                    </SelectItem>
                    <SelectItem value="4" className="rounded-none">
                      Fans
                    </SelectItem>
                    <SelectItem value="5" className="rounded-none">
                      Storage
                    </SelectItem>
                    <SelectItem value="6" className="rounded-none">
                      Case
                    </SelectItem>
                    <SelectItem value="7" className="rounded-none">
                      Peripheral
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label id="condition_label" htmlFor="condition_select">
                  Condition
                </Label>
                <Select
                  value={formData.condition_id.toString()}
                  onValueChange={(value) =>
                    handleSelectChange('condition_id', value)
                  }
                >
                  <SelectTrigger
                    id="condition_select"
                    aria-labelledby="condition_label"
                    className="mt-1 w-full rounded-none bg-hardware-white pl-3 text-hardware-charcoal"
                  >
                    <SelectValue placeholder="Choose one" />
                  </SelectTrigger>

                  <SelectContent className="w-[var(--radix-select-trigger-width)] rounded-none bg-hardware-white pl-3 text-hardware-charcoal">
                    <SelectItem value="1" className="rounded-none">
                      New
                    </SelectItem>
                    <SelectItem value="2" className="rounded-none">
                      Like New
                    </SelectItem>
                    <SelectItem value="3" className="rounded-none">
                      Used
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="item_description">Description</Label>
                <Textarea
                  id="item_description"
                  value={formData.item_description}
                  onChange={handleChange}
                  placeholder="Write a brief description about this listing..."
                  className="mt-1 flex h-40 flex-grow flex-col rounded-none bg-hardware-white p-2 text-hardware-charcoal"
                  required
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4 rounded-none bg-hardware-white p-6">
                <h3 className="font-mono text-lg text-hardware-charcoal">
                  2. Image Upload
                </h3>
                <div className="mb-4 flex gap-4">
                  <Button
                    type="button"
                    onClick={() => setImageSource('upload')}
                    className={`rounded-sm px-4 py-2 font-mono ${
                      imageSource === 'upload'
                        ? 'bg-hardware-graphite text-white'
                        : 'bg-hardware-lightgray text-hardware-charcoal'
                    }`}
                  >
                    Upload Image
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setImageSource('Preset')}
                    className={`rounded-sm px-4 py-2 font-mono ${
                      imageSource === 'Preset'
                        ? 'bg-hardware-graphite text-white'
                        : 'bg-hardware-lightgray text-hardware-charcoal'
                    }`}
                  >
                    Choose Preset
                  </Button>
                </div>
                {imageSource === 'upload' ? (
                  <>
                    <p className="text-hardware-charcoal">
                      Upload a photo for your listing
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <Button
                      type="button"
                      className="rounded-sm bg-hardware-graphite px-4 py-2 font-mono text-white"
                      onClick={() =>
                        document.getElementById('file-upload')?.click()
                      }
                    >
                      Choose File
                    </Button>
                  </>
                ) : (
                  <>
                    <p className="text-hardware-charcoal">
                      Select a preset image for your listing
                    </p>
                    <div className="grid min-h-56 grid-cols-3 gap-4">
                      {presetImages.map((imagePath, index) => (
                        <Button
                          key={index}
                          type="button"
                          onClick={() => handlePresetImageSelect(imagePath)}
                          className={`rounded-none border-2 p-0 shadow-none ${
                            formData.item_image === imagePath
                              ? 'border-hardware-blue'
                              : 'border-transparent'
                          }`}
                        >
                          <div className="bg-hardware-lightgray aspect-[4/3] w-full">
                            <img
                              src={imagePath}
                              alt={`Preset ${index + 1}`}
                              className="h-full w-full object-contain"
                            />
                          </div>
                        </Button>
                      ))}
                    </div>
                  </>
                )}

                <div className="flex h-48 w-full items-center justify-center rounded-none border border-hardware-graphite text-hardware-graphite">
                  {formData.item_image ? (
                    <img
                      src={formData.item_image}
                      alt="Preview"
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <span className="italic">Image Preview</span>
                  )}
                </div>
              </div>

              <div className="space-y-6 rounded-none bg-hardware-graphite p-6 text-white">
                <h3 className="font-mono text-lg">3. Important Info</h3>
                <ul className="space-y-2">
                  <li>• Auctions run for five days from posting</li>
                  <li>
                    • Listings are subject to{' '}
                    <span className="font-bold">Terms & Conditions</span>
                  </li>
                </ul>
                <div className="flex items-center gap-4 pt-4">
                  <input
                    type="checkbox"
                    className="h-5 w-5"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                  />
                  <span>I understand & agree</span>
                  <Button
                    type="submit"
                    className="ml-auto rounded-sm bg-hardware-blue px-4 py-2 font-mono text-white hover:bg-blue-600"
                    disabled={!agreedToTerms}
                  >
                    Add Listing
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
