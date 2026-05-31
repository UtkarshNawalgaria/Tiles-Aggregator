'use client'

import { SlidersHorizontal } from 'lucide-react'

type SortOption = 'relevance' | 'price_asc' | 'price_desc' | 'rating' | 'reviews'

const SORT_LABELS: Record<SortOption, string> = {
  relevance: 'Relevance',
  price_asc: 'Price: Low to High',
  price_desc: 'Price: High to Low',
  rating: 'Highest Rated',
  reviews: 'Most Reviewed',
}

interface ResultsHeaderProps {
  count: number
  query: string
  sort: SortOption
  onSort: (s: SortOption) => void
  onToggleFilters: () => void
}

export default function ResultsHeader({ count, query, sort, onSort, onToggleFilters }: ResultsHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleFilters}
          className="lg:hidden flex items-center gap-1.5 border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </button>
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-900">{count}</span> tile{count !== 1 ? 's' : ''} found
          {query && (
            <> for <span className="font-semibold text-gray-900">"{query}"</span></>
          )}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-500 whitespace-nowrap hidden sm:block">Sort by</label>
        <select
          value={sort}
          onChange={(e) => onSort(e.target.value as SortOption)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
        >
          {(Object.keys(SORT_LABELS) as SortOption[]).map((s) => (
            <option key={s} value={s}>{SORT_LABELS[s]}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
