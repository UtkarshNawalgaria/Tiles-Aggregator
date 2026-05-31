import axios from 'axios'
import type { TileProduct } from '../types'

interface SerpApiShoppingResult {
  position: number
  title: string
  link: string
  source: string
  price?: string
  extracted_price?: number
  rating?: number
  reviews?: number
  thumbnail?: string
  extensions?: string[]
  tag?: string
}

interface SerpApiResponse {
  shopping_results?: SerpApiShoppingResult[]
  error?: string
}

function parseSize(text: string): string {
  const match = text.match(/(\d+(?:\.\d+)?)\s*[xX×]\s*(\d+(?:\.\d+)?)\s*(?:in|inch)?/)
  if (match) return `${match[1]}x${match[2]} in`
  return 'Varies'
}

function parseMaterial(text: string): string {
  const t = text.toLowerCase()
  if (t.includes('porcelain')) return 'Porcelain'
  if (t.includes('marble') || t.includes('travertine') || t.includes('slate') || t.includes('limestone') || t.includes('granite')) return 'Natural Stone'
  if (t.includes('glass')) return 'Glass'
  if (t.includes('mosaic')) return 'Mosaic'
  if (t.includes('ceramic')) return 'Ceramic'
  return 'Porcelain'
}

function parseFinish(text: string): string {
  const t = text.toLowerCase()
  if (t.includes('polished') || t.includes('shiny')) return 'Polished'
  if (t.includes('glossy') || t.includes('gloss')) return 'Glossy'
  if (t.includes('satin')) return 'Satin'
  if (t.includes('textured') || t.includes('slate') || t.includes('tumbled')) return 'Textured'
  if (t.includes('matte') || t.includes('mat')) return 'Matte'
  return 'Matte'
}

function parseColor(text: string): string {
  const t = text.toLowerCase()
  if (t.includes('white') || t.includes('bianco') || t.includes('blanco')) return 'White'
  if (t.includes('black') || t.includes('nero') || t.includes('noir')) return 'Black'
  if (t.includes('gray') || t.includes('grey') || t.includes('grigio')) return 'Gray'
  if (t.includes('beige') || t.includes('ivory') || t.includes('cream') || t.includes('sand') || t.includes('travertine')) return 'Beige'
  if (t.includes('blue') || t.includes('navy') || t.includes('azure')) return 'Blue'
  if (t.includes('green') || t.includes('sage') || t.includes('fern')) return 'Green'
  if (t.includes('brown') || t.includes('wood') || t.includes('walnut') || t.includes('oak')) return 'Brown'
  if (t.includes('terracotta') || t.includes('clay') || t.includes('saltillo') || t.includes('rust')) return 'Terracotta'
  return 'Multi'
}

export async function searchSerpApi(query: string, apiKey: string): Promise<TileProduct[]> {
  try {
    const response = await axios.get<SerpApiResponse>('https://serpapi.com/search.json', {
      params: {
        engine: 'google_shopping',
        q: `${query} tile`,
        gl: 'us',
        hl: 'en',
        api_key: apiKey,
      },
      timeout: 10000,
    })

    const results = response.data.shopping_results ?? []

    return results.slice(0, 40).map((item, idx): TileProduct => {
      const titleAndExt = [item.title, ...(item.extensions ?? [])].join(' ')
      return {
        id: `serp-${idx}-${Date.now()}`,
        name: item.title,
        brand: item.source ?? 'Unknown',
        retailer: item.source ?? 'Unknown',
        price: item.extracted_price ?? 0,
        priceUnit: 'sqft',
        priceDisplay: item.price ?? (item.extracted_price ? `$${item.extracted_price.toFixed(2)}` : 'See site'),
        size: parseSize(titleAndExt),
        material: parseMaterial(titleAndExt),
        finish: parseFinish(titleAndExt),
        color: parseColor(titleAndExt),
        imageUrl: item.thumbnail ?? '',
        productUrl: item.link,
        rating: item.rating ?? 0,
        reviewCount: item.reviews ?? 0,
        inStock: true,
      }
    })
  } catch {
    return []
  }
}
