import Link from 'next/link'
import SearchBar from '@/components/SearchBar'
import { Grid3X3, ArrowRight, Search, Globe, ShoppingCart, Layers } from 'lucide-react'

const POPULAR_SEARCHES = [
  'White subway tile',
  'Marble hexagon',
  'Wood look plank',
  'Black matte 24x24',
  'Terracotta 8x8',
  'Porcelain outdoor',
]

const CATEGORIES = [
  {
    title: 'Bathroom',
    description: 'Shower walls, floor tiles, mosaic accents',
    query: 'bathroom wall tile',
    emoji: '🚿',
    bgClass: 'from-blue-50 to-cyan-50 border-blue-100',
  },
  {
    title: 'Kitchen',
    description: 'Backsplash, countertop tile, floor tile',
    query: 'kitchen backsplash tile',
    emoji: '🍳',
    bgClass: 'from-amber-50 to-yellow-50 border-amber-100',
  },
  {
    title: 'Outdoor',
    description: 'Patio, pool surround, exterior walls',
    query: 'outdoor patio tile',
    emoji: '☀️',
    bgClass: 'from-green-50 to-emerald-50 border-green-100',
  },
  {
    title: 'Living Room',
    description: 'Large format floors, accent walls, fireplace',
    query: 'large format floor tile',
    emoji: '🛋️',
    bgClass: 'from-slate-50 to-gray-50 border-slate-100',
  },
]

const HOW_IT_WORKS = [
  {
    step: '01',
    icon: Search,
    title: 'Search any tile',
    description: 'Type in what you\'re looking for — material, color, size, style, or brand.',
  },
  {
    step: '02',
    icon: Globe,
    title: 'We check 50+ sites',
    description: 'We aggregate results from Home Depot, Floor & Decor, Tile Bar, Lowe\'s, Wayfair, and more.',
  },
  {
    step: '03',
    icon: ShoppingCart,
    title: 'Compare & buy',
    description: 'Filter, sort, and compare tiles side-by-side, then click through to buy directly.',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center">
              <Grid3X3 className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-xl text-slate-800">TileSearch</span>
          </div>
          <p className="hidden sm:block text-sm text-gray-500">Find any tile across 50+ retailers</p>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="tile-pattern-bg py-20 sm:py-28 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <Layers className="w-4 h-4" />
              50+ retailers aggregated in one search
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-4">
              Find the perfect tile{' '}
              <span className="text-amber-600">without the hassle</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-500 mb-10 max-w-xl mx-auto">
              Search any tile across all major retailers in one place. Compare prices, materials, and styles instantly.
            </p>

            {/* Search bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <SearchBar size="lg" autoFocus />
            </div>

            {/* Popular searches */}
            <div className="flex flex-wrap justify-center gap-2">
              <span className="text-sm text-gray-400 mr-1 flex items-center">Popular:</span>
              {POPULAR_SEARCHES.map((term) => (
                <Link
                  key={term}
                  href={`/search?q=${encodeURIComponent(term)}`}
                  className="text-sm bg-white border border-gray-200 hover:border-amber-300 hover:bg-amber-50 text-gray-700 hover:text-amber-700 px-3 py-1.5 rounded-full transition-colors shadow-sm"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 sm:py-20 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 text-center mb-3">
              How TileSearch works
            </h2>
            <p className="text-gray-500 text-center mb-12 max-w-lg mx-auto">
              Stop wasting hours browsing different websites. We do the heavy lifting for you.
            </p>
            <div className="grid sm:grid-cols-3 gap-8">
              {HOW_IT_WORKS.map(({ step, icon: Icon, title, description }) => (
                <div key={step} className="text-center">
                  <div className="w-14 h-14 bg-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-xs font-bold text-amber-600 mb-1">STEP {step}</div>
                  <h3 className="font-bold text-slate-800 mb-2">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="py-16 sm:py-20 px-4 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 text-center mb-3">
              Browse by category
            </h2>
            <p className="text-gray-500 text-center mb-10">
              Not sure where to start? Explore tiles by room type.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {CATEGORIES.map(({ title, description, query, emoji, bgClass }) => (
                <Link
                  key={title}
                  href={`/search?q=${encodeURIComponent(query)}`}
                  className={`group bg-gradient-to-br ${bgClass} border rounded-2xl p-6 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5`}
                >
                  <div className="text-3xl mb-3">{emoji}</div>
                  <h3 className="font-bold text-slate-800 mb-1 group-hover:text-amber-700 transition-colors">
                    {title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3 leading-snug">{description}</p>
                  <div className="flex items-center gap-1 text-amber-600 text-sm font-medium">
                    Browse tiles
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20 px-4 bg-slate-900">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to find your perfect tile?
            </h2>
            <p className="text-slate-400 mb-8">
              Search once, compare everywhere. No more tab-switching between retailer websites.
            </p>
            <div className="max-w-lg mx-auto">
              <SearchBar size="lg" />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-amber-600 rounded-lg flex items-center justify-center">
              <Grid3X3 className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-slate-800">TileSearch</span>
          </div>
          <p className="text-sm text-gray-400 text-center">
            Aggregating tiles from Home Depot, Floor &amp; Decor, Tile Bar, Lowe&apos;s, Wayfair, MSI Surfaces &amp; more.
          </p>
          <p className="text-xs text-gray-300">© {new Date().getFullYear()} TileSearch</p>
        </div>
      </footer>
    </div>
  )
}
