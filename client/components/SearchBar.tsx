import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useQuery } from '@tanstack/react-query'
import { getCategories, getConditions } from '../apis/options'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { searchListings } from 'client/apis/listings'
import { useNavigate } from 'react-router'

export function SearchBar() {
  const [catId, setCatId] = useState(0)
  const [conId, setConId] = useState(0)
  const [keywords, setKeywords] = useState('')

  const navigate = useNavigate()

  const {
    data: catData,
    isPending: catIsPending,
    error: catError,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      return getCategories()
    },
  })

  const {
    data: conData,
    isPending: conIsPending,
    error: conError,
  } = useQuery({
    queryKey: ['conditions'],
    queryFn: async () => {
      return getConditions()
    },
  })

  const { refetch } = useQuery({
    queryKey: ['listings', catId, conId, keywords],
    queryFn: async () => {
      return searchListings(catId, conId, keywords)
    },
    enabled: false, //usequery disabled until refetch triggered
  })

  if (catIsPending) {
    return <p>Loading...</p>
  }

  if (catError) {
    return <p>{catError.message}</p>
  }

  if (!catData) {
    return <p>Data not found</p>
  }

  if (conIsPending) {
    return <p>Loading...</p>
  }

  if (conError) {
    return <p>{conError.message}</p>
  }

  if (!conData) {
    return <p>Data not found</p>
  }

  //search query disabled so no if checks needed

  const handleClick = () => {
    refetch()
    navigate('/search/results')
  }

  return (
    <div>
      <div className="flex items-center justify-center gap-6 bg-hardware-sky px-8 py-6">
        <span className="font-mono text-hardware-charcoal">Search</span>

        <Select onValueChange={(value) => setCatId(Number(value))}>
          <SelectTrigger className="w-80 rounded-none bg-hardware-white pl-3 text-hardware-charcoal">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="w-[var(--radix-select-trigger-width)] rounded-none bg-hardware-white pl-3 text-hardware-charcoal">
            {catData.map((cat) => (
              <SelectItem key={cat.id} value={String(cat.id)}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => setConId(Number(value))}>
          <SelectTrigger className="w-80 rounded-none bg-hardware-white pl-3 text-hardware-charcoal">
            <SelectValue placeholder="Condition" />
          </SelectTrigger>
          <SelectContent className="w-[var(--radix-select-trigger-width)] rounded-none bg-hardware-white pl-3 text-hardware-charcoal">
            {conData.map((con) => (
              <SelectItem
                key={con.id}
                value={String(con.id)}
                className="rounded-none"
              >
                {con.description}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="Keywords"
          className="text-md w-96 rounded-none bg-hardware-white p-1 text-hardware-charcoal"
        />
        <Button onClick={handleClick}>
          <span className="text-2xl">🔍</span>
        </Button>
      </div>
    </div>
  )
}
