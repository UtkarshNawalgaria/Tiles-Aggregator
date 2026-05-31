'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, X } from 'lucide-react'
import type { SearchFilters } from '@/lib/types'

const MATERIALS = ['Porcelain', 'Ceramic', 'Natural Stone', 'Glass', 'Mosaic']
const SIZES = ['1x1 in', '2x2 in', '3x6 in', '4x4 in', '4x8 in', '6x6 in', '12x12 in', '12x24 in', '18x18 in', '24x24 in']
const FINISHES = ['Matte', 'Polished', 'Glossy', 'Satin', 'Textured', 'Tumbled']
const COLORS = [
  { name: 'White', bg: 'bg-white border border-gray-300' },
  { name: 'Gray', bg: 'bg-gray-400' },
  { name: 'Beige', bg: 'bg-amber-100 border border-amber-200' },
  { name: 'Blue', bg: 'bg-blue-500' },
  { name: 'Black', bg: 'bg-gray-900' },
  { name: 'Brown', bg: 'bg-amber-800' },
  { name: 'Terracotta', bg: 'bg-orange-600' },
  { name: 'Green', bg: 'bg-green-600' },
]
const RETAILERS = ['Home Depot', 'Floor & Decor', 'Tile Bar', "Lowe's", 'Wayfair', 'MSI Surfaces']

interface FilterPanelProps {
  filters: SearchFilters
  onChange: (f: SearchFilters) => void
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="border-b border-gray-100 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-sm font-semibold text-gray-800 mb-2"
      >
        {title}
        {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>
      {open && children}
    </div>
  )
}

function toggle<T>(arr: T[] | undefined, val: T): T[] {
  const a = arr ?? []
  return a.includes(val) ? a.filter((x) => x !== val) : [...a, val]
}

export default function FilterPanel({ filters, onChange }: FilterPanelProps) {
  const hasFilters = !!(
    filters.material?.length || filters.size?.length || filters.finish?.length ||
    filters.color?.length || filters.retailer?.length ||
    filters.priceMin !== undefined || filters.priceMax !== undefined || filters.inStockOnly
  )

  return (
    <aside className="w-full">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-bold text-gray-900 text-base">Filters</h2>
        {hasFilters && (
          <button
            onClick={() => onChange({})}
            className="text-xs text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1"
          >
            <X className="w-3 h-3" /> Clear all
          </button>
        )}
      </div>

      <Section title="Material">
        <div className="space-y-1.5">
          {MATERIALS.map((m) => (
            <label key={m} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.material?.includes(m) ?? false}
                onChange={() => onChange({ ...filters, material: toggle(filters.material, m) })}
                className="accent-amber-600 w-4 h-4 rounded"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">{m}</span>
            </label>
          ))}
        </div>
      </Section>

      <Section title="Color">
        <div className="flex flex-wrap gap-2">
          {COLORS.map(({ name, bg }) => (
            <button
              key={name}
              onClick={() => onChange({ ...filters, color: toggle(filters.color, name) })}
              title={name}
              className={`w-7 h-7 rounded-full transition-transform hover:scale-110 ${bg} ${
                filters.color?.includes(name) ? 'ring-2 ring-amber-500 ring-offset-2' : ''
              }`}
            />
          ))}
        </div>
        {filters.color?.length ? (
          <p className="text-xs text-gray-500 mt-2">{filters.color.join(', ')}</p>
        ) : null}
      </Section>

      <Section title="Finish">
        <div className="space-y-1.5">
          {FINISHES.map((f) => (
            <label key={f} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.finish?.includes(f) ?? false}
                onChange={() => onChange({ ...filters, finish: toggle(filters.finish, f) })}
                className="accent-amber-600 w-4 h-4 rounded"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">{f}</span>
            </label>
          ))}
        </div>
      </Section>

      <Section title="Size">
        <div className="space-y-1.5">
          {SIZES.map((s) => (
            <label key={s} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.size?.includes(s) ?? false}
                onChange={() => onChange({ ...filters, size: toggle(filters.size, s) })}
                className="accent-amber-600 w-4 h-4 rounded"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">{s}</span>
            </label>
          ))}
        </div>
      </Section>

      <Section title="Retailer">
        <div className="space-y-1.5">
          {RETAILERS.map((r) => (
            <label key={r} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.retailer?.includes(r) ?? false}
                onChange={() => onChange({ ...filters, retailer: toggle(filters.retailer, r) })}
                className="accent-amber-600 w-4 h-4 rounded"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">{r}</span>
            </label>
          ))}
        </div>
      </Section>

      <Section title="Price per sq ft">
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={0}
            step={0.5}
            placeholder="Min"
            value={filters.priceMin ?? ''}
            onChange={(e) => onChange({ ...filters, priceMin: e.target.value ? parseFloat(e.target.value) : undefined })}
            className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <span className="text-gray-400 text-sm">–</span>
          <input
            type="number"
            min={0}
            step={0.5}
            placeholder="Max"
            value={filters.priceMax ?? ''}
            onChange={(e) => onChange({ ...filters, priceMax: e.target.value ? parseFloat(e.target.value) : undefined })}
            className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </Section>

      <div className="py-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <div
            onClick={() => onChange({ ...filters, inStockOnly: !filters.inStockOnly })}
            className={`relative w-10 h-5 rounded-full transition-colors ${filters.inStockOnly ? 'bg-amber-600' : 'bg-gray-300'}`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${filters.inStockOnly ? 'translate-x-5' : ''}`}
            />
          </div>
          <span className="text-sm text-gray-700 font-medium">In stock only</span>
        </label>
      </div>
    </aside>
  )
}
