import { NextRequest, NextResponse } from 'next/server'
import { searchTiles } from '@/lib/scrapers'
import type { SearchFilters } from '@/lib/types'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const query = searchParams.get('q') ?? ''

  const material = searchParams.getAll('material')
  const size = searchParams.getAll('size')
  const finish = searchParams.getAll('finish')
  const color = searchParams.getAll('color')
  const retailer = searchParams.getAll('retailer')
  const priceMinStr = searchParams.get('priceMin')
  const priceMaxStr = searchParams.get('priceMax')
  const inStockOnly = searchParams.get('inStockOnly') === 'true'

  const filters: SearchFilters = {
    ...(material.length && { material }),
    ...(size.length && { size }),
    ...(finish.length && { finish }),
    ...(color.length && { color }),
    ...(retailer.length && { retailer }),
    ...(priceMinStr && { priceMin: parseFloat(priceMinStr) }),
    ...(priceMaxStr && { priceMax: parseFloat(priceMaxStr) }),
    ...(inStockOnly && { inStockOnly }),
  }

  const result = await searchTiles(query, filters)
  return NextResponse.json(result)
}
