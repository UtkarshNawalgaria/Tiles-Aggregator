'use client'

import { Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Grid3X3, X, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

import SearchBar from '@/components/SearchBar'
import FilterPanel from '@/components/FilterPanel'
import TileCard from '@/components/TileCard'
import ResultsHeader from '@/components/ResultsHeader'
import LoadingGrid from '@/components/LoadingGrid'
import type { SearchFilters, SearchResponse, TileProduct } from '@/lib/types'

type SortOption = 'relevance' | 'price_asc' | 'price_desc' | 'rating' | 'reviews'

function sortProducts(products: TileProduct[], sort: SortOption): TileProduct[] {
  const arr = [...products]
  switch (sort) {
    case 'price_asc':
      return arr.sort((a, b) => a.price - b.price)
    case 'price_desc':
      return arr.sort((a, b) => b.price - a.price)
    case 'rating':
      return arr.sort((a, b) => b.rating - a.rating)
    case 'reviews':
      return arr.sort((a, b) => b.reviewCount - a.reviewCount)
    default:
      return arr
  }
}

function buildApiUrl(query: string, filters: SearchFilters): string {
  const params = new URLSearchParams()
  params.set('q', query)
  filters.material?.forEach((m) => params.append('material', m))
  filters.size?.forEach((s) => params.append('size', s))
  filters.finish?.forEach((f) => params.append('finish', f))
  filters.color?.forEach((c) => params.append('color', c))
  filters.retailer?.forEach((r) => params.append('retailer', r))
  if (filters.priceMin !== undefined) params.set('priceMin', String(filters.priceMin))
  if (filters.priceMax !== undefined) params.set('priceMax', String(filters.priceMax))
  if (filters.inStockOnly) params.set('inStockOnly', 'true')
  return `/api/search?${params.toString()}`
}

function SearchPageInner() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get('q') ?? ''

  const [data, setData] = useState<SearchResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<SearchFilters>({})
  const [sort, setSort] = useState<SortOption>('relevance')
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const fetchResults = useCallback(async (q: string, f: SearchFilters) => {
    if (!q) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(buildApiUrl(q, f))
      if (!res.ok) throw new Error('Search failed')
      const json: SearchResponse = await res.json()
      setData(json)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchResults(query, filters)
  }, [query, filters, fetchResults])

  const handleFiltersChange = useCallback((newFilters: SearchFilters) => {
    setFilters(newFilters)
  }, [])

  const sortedProducts = useMemo(
    () => sortProducts(data?.products ?? [], sort),
    [data?.products, sort]
  )

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Sticky header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center">
              <Grid3X3 className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-slate-800 hidden sm:block">TileSearch</span>
          </Link>
          <div className="flex-1 max-w-2xl">
            <SearchBar defaultValue={query} size="sm" />
          </div>
        </div>
      </header>

      {/* Demo banner */}
      {data?.usingDemo && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-amber-800">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>
              <strong>Preview mode</strong> — showing sample tile data. Add a{' '}
              <code className="bg-amber-100 px-1 py-0.5 rounded text-xs font-mono">SERP_API_KEY</code>{' '}
              to your <code className="bg-amber-100 px-1 py-0.5 rounded text-xs font-mono">.env.local</code>{' '}
              to search live tile data.
            </span>
          </div>
        </div>
      )}

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6">
        <div className="flex gap-6">
          {/* Sidebar filters — desktop */}
          <aside className="hidden lg:block w-60 shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
              <FilterPanel filters={filters} onChange={handleFiltersChange} />
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            <ResultsHeader
              count={sortedProducts.length}
              query={query}
              sort={sort}
              onSort={setSort}
              onToggleFilters={() => setShowMobileFilters(true)}
            />

            {loading && <div className="mt-4"><LoadingGrid /></div>}

            {!loading && error && (
              <div className="mt-8 text-center py-12">
                <p className="text-red-500 font-medium">{error}</p>
                <button
                  onClick={() => fetchResults(query, filters)}
                  className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-lg text-sm hover:bg-amber-700 transition-colors"
                >
                  Try again
                </button>
              </div>
            )}

            {!loading && !error && data && sortedProducts.length === 0 && (
              <div className="mt-8 text-center py-16">
                <div className="text-4xl mb-4">🔍</div>
                <h2 className="text-xl font-bold text-slate-800 mb-2">No tiles found</h2>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search or clearing some filters.
                </p>
                <button
                  onClick={() => setFilters({})}
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg text-sm hover:bg-amber-700 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {!loading && !error && sortedProducts.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {sortedProducts.map((product) => (
                  <TileCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="relative ml-auto w-80 max-w-full h-full bg-white overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="font-bold text-slate-800">Filters</h2>
              <button onClick={() => setShowMobileFilters(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-4">
              <FilterPanel
                filters={filters}
                onChange={(f) => {
                  handleFiltersChange(f)
                }}
              />
            </div>
            <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4">
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full bg-amber-600 text-white font-semibold py-3 rounded-xl hover:bg-amber-700 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    }>
      <SearchPageInner />
    </Suspense>
  )
}
