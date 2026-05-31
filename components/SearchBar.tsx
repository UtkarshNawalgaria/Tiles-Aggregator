'use client'

import { Search, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, FormEvent } from 'react'

interface SearchBarProps {
  defaultValue?: string
  autoFocus?: boolean
  size?: 'sm' | 'lg'
}

export default function SearchBar({ defaultValue = '', autoFocus = false, size = 'lg' }: SearchBarProps) {
  const [value, setValue] = useState(defaultValue)
  const router = useRouter()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const q = value.trim()
    if (q) router.push(`/search?q=${encodeURIComponent(q)}`)
  }

  const inputClass = size === 'lg'
    ? 'h-14 text-lg pl-12 pr-14'
    : 'h-11 text-base pl-10 pr-12'

  const iconClass = size === 'lg' ? 'left-4 w-5 h-5' : 'left-3 w-4 h-4'
  const clearClass = size === 'lg' ? 'right-[5.5rem] w-5 h-5' : 'right-16 w-4 h-4'
  const btnClass = size === 'lg' ? 'px-5 text-base h-14' : 'px-4 text-sm h-11'

  return (
    <form onSubmit={handleSubmit} className="flex w-full gap-0">
      <div className="relative flex-1">
        <Search className={`absolute top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none ${iconClass}`} />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search tiles — e.g. white subway 3x6, marble hexagon, wood plank..."
          autoFocus={autoFocus}
          className={`w-full border border-gray-300 border-r-0 rounded-l-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent ${inputClass}`}
        />
        {value && (
          <button
            type="button"
            onClick={() => setValue('')}
            className={`absolute top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 ${clearClass}`}
          >
            <X className="w-full h-full" />
          </button>
        )}
      </div>
      <button
        type="submit"
        className={`bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-r-xl transition-colors flex items-center gap-2 whitespace-nowrap ${btnClass}`}
      >
        <Search className="w-4 h-4" />
        Search
      </button>
    </form>
  )
}
