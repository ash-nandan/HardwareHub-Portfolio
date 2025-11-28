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
import { useNavigate } from 'react-router'
import { Search } from 'lucide-react'

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

  const handleClick = () => {
    navigate('/search/results', {
      state: { catId, conId, keywords },
    })
  }

  const searchDisabled = catId === 0 || conId === 0

  return (
    <div className="bg-hardware-sky px-4 py-4 sm:px-6 md:px-8">
      <div
        className="
  mx-auto flex max-w-5xl flex-col gap-4
  md:flex-row md:flex-wrap md:items-center md:justify-center md:gap-6
  lg:flex-nowrap lg:justify-center
"
      >
        <span className="w-full font-mono text-sm text-hardware-charcoal md:w-auto md:text-base">
          Search
        </span>

        <div className="w-full md:w-80">
          <Select onValueChange={(value) => setCatId(Number(value))}>
            <SelectTrigger
              data-testid="category-select"
              className="w-full rounded-none bg-hardware-white pl-3 text-hardware-charcoal"
            >
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="w-[var(--radix-select-trigger-width)] rounded-none bg-hardware-white pl-3 text-hardware-charcoal">
              {catData.map((cat) => (
                <SelectItem key={cat.id} value={String(cat.id) || ''}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full md:w-80">
          <Select onValueChange={(value) => setConId(Number(value))}>
            <SelectTrigger
              data-testid="condition-select"
              className="w-full rounded-none bg-hardware-white pl-3 text-hardware-charcoal"
            >
              <SelectValue placeholder="Condition" />
            </SelectTrigger>
            <SelectContent className="w-[var(--radix-select-trigger-width)] rounded-none bg-hardware-white pl-3 text-hardware-charcoal">
              {conData.map((con) => (
                <SelectItem
                  key={con.id}
                  value={String(con.id) || ''}
                  className="rounded-none"
                >
                  {con.description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full md:w-80 lg:w-80">
          <label htmlFor="keywords" className="sr-only">
            Keywords
          </label>
          <Input
            onChange={(e) => setKeywords(e.target.value)}
            id="keywords"
            placeholder="Keywords"
            className="w-full rounded-none bg-hardware-white p-2 text-sm text-hardware-charcoal"
          />
        </div>

        <div className="flex w-full justify-end md:w-auto">
          <Button
            aria-label="search listings"
            disabled={searchDisabled}
            className="border-mint group w-full max-w-[120px] rounded-none bg-hardware-sky py-2 text-sm text-white md:w-auto"
            onClick={handleClick}
          >
            <Search className="mr-1 text-lg text-hardware-charcoal group-disabled:opacity-20" />
          </Button>
        </div>
      </div>
    </div>
  )
}
