import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function SearchBar() {
  return (
    <div>
      <div className="flex items-center justify-center gap-6 bg-hardware-sky px-8 py-6">
        <span className="font-mono text-hardware-charcoal">Search</span>

        <Select>
          <SelectTrigger className="w-80 rounded-none bg-hardware-white pl-3 text-hardware-charcoal">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="w-[var(--radix-select-trigger-width)] rounded-none bg-hardware-white pl-3 text-hardware-charcoal">
            <SelectItem value="cpu">CPU</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-80 rounded-none bg-hardware-white pl-3 text-hardware-charcoal">
            <SelectValue placeholder="Condition" />
          </SelectTrigger>
          <SelectContent className="w-[var(--radix-select-trigger-width)] rounded-none bg-hardware-white pl-3 text-hardware-charcoal">
            <SelectItem value="used" className="rounded-none">
              Used
            </SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="Keywords"
          className="text-md w-96 rounded-none bg-hardware-white p-1 text-hardware-charcoal"
        />

        <span className="text-2xl">🔍</span>
      </div>
    </div>
  )
}
