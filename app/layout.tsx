import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TileSearch — Find Tiles Across 50+ Retailers',
  description:
    'Search for tiles across all major retailers in one place. Compare prices, materials, and styles from Home Depot, Floor & Decor, Tile Bar, and more.',
  keywords: 'tiles, floor tiles, wall tiles, porcelain, ceramic, tile search, tile comparison',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
