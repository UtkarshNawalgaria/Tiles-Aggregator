'use client'

import { Star, ExternalLink, Package } from 'lucide-react'
import type { TileProduct } from '@/lib/types'
import Image from 'next/image'
import { useState } from 'react'

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`w-3.5 h-3.5 ${n <= Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
        />
      ))}
    </div>
  )
}

const RETAILER_COLORS: Record<string, string> = {
  'Home Depot': 'bg-orange-100 text-orange-800',
  'Floor & Decor': 'bg-green-100 text-green-800',
  'Tile Bar': 'bg-blue-100 text-blue-800',
  "Lowe's": 'bg-sky-100 text-sky-800',
  'Wayfair': 'bg-purple-100 text-purple-800',
  'MSI Surfaces': 'bg-slate-100 text-slate-800',
}

export default function TileCard({ product }: { product: TileProduct }) {
  const [imgError, setImgError] = useState(false)
  const badgeColor = RETAILER_COLORS[product.retailer] ?? 'bg-gray-100 text-gray-700'

  return (
    <div className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {!imgError && product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-12 h-12 text-gray-300" />
          </div>
        )}

        {/* Retailer badge */}
        <span className={`absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full ${badgeColor}`}>
          {product.retailer}
        </span>

        {/* Stock badge */}
        {!product.inStock && (
          <span className="absolute top-2 right-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-700">
            Out of stock
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <div>
          <p className="text-xs text-amber-700 font-medium">{product.brand}</p>
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug mt-0.5">
            {product.name}
          </h3>
        </div>

        {/* Rating */}
        {product.rating > 0 && (
          <div className="flex items-center gap-1.5">
            <Stars rating={product.rating} />
            <span className="text-xs text-gray-500">
              {product.rating.toFixed(1)} ({product.reviewCount.toLocaleString()})
            </span>
          </div>
        )}

        {/* Specs pills */}
        <div className="flex flex-wrap gap-1">
          {[product.size, product.material, product.finish].map((spec) => (
            <span key={spec} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              {spec}
            </span>
          ))}
        </div>

        {/* Coverage */}
        {product.coverage && (
          <p className="text-xs text-gray-400">{product.coverage}</p>
        )}

        {/* Price + CTA */}
        <div className="mt-auto pt-2 flex items-center justify-between gap-2">
          <div>
            <span className="text-xl font-bold text-gray-900">{product.priceDisplay}</span>
          </div>
          <a
            href={product.productUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
          >
            View
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  )
}
