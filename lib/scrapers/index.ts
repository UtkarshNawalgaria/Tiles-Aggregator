import type { SearchFilters, SearchResponse, TileProduct } from '../types'
import { getDemoTiles } from './demo'
import { searchSerpApi } from './serpapi'

function applyFilters(products: TileProduct[], filters?: SearchFilters): TileProduct[] {
  if (!filters) return products
  return products.filter((p) => {
    if (filters.material?.length && !filters.material.includes(p.material)) return false
    if (filters.size?.length && !filters.size.some((s) => p.size.includes(s.replace('in', '').trim()))) return false
    if (filters.finish?.length && !filters.finish.includes(p.finish)) return false
    if (filters.color?.length && !filters.color.includes(p.color)) return false
    if (filters.retailer?.length && !filters.retailer.includes(p.retailer)) return false
    if (filters.priceMin !== undefined && p.price < filters.priceMin) return false
    if (filters.priceMax !== undefined && p.price > filters.priceMax) return false
    if (filters.inStockOnly && !p.inStock) return false
    return true
  })
}

export async function searchTiles(query: string, filters?: SearchFilters): Promise<SearchResponse> {
  const apiKey = process.env.SERP_API_KEY

  if (apiKey) {
    const products = await searchSerpApi(query, apiKey)
    if (products.length > 0) {
      const filtered = applyFilters(products, filters)
      const sources = Array.from(new Set(filtered.map((p) => p.retailer)))
      return { products: filtered, totalCount: filtered.length, sources, query, usingDemo: false }
    }
  }

  const demoProducts = getDemoTiles(query)
  const filtered = applyFilters(demoProducts, filters)
  const sources = Array.from(new Set(filtered.map((p) => p.retailer)))
  return { products: filtered, totalCount: filtered.length, sources, query, usingDemo: true }
}
