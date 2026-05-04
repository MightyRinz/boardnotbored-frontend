'use client'

import { useEffect, useState } from 'react'
import { fetchShops } from '../lib/api'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [shops, setShops] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    fetchShops().then(setShops)
  }, [])

  return (
    <div className="p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">🏪 Boardgame Cafes</h1>

      {/* Shop list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {shops.map(shop => (
          <div
            key={shop.id}
            className="border rounded-xl p-4 shadow hover:shadow-lg transition cursor-pointer"
            onClick={() => router.push(`/shops/${shop.id}`)}
          >
            {/* Name + Status */}
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">{shop.name}</h2>

              {shop.isOpen ? (
                <span className="text-green-600 font-medium">OPEN</span>
              ) : (
                <span className="text-red-500 font-medium">CLOSED</span>
              )}
            </div>

            {/* Address */}
            <p className="text-gray-600 text-sm mt-2">
              📍 {shop.address || 'No address'}
            </p>

            {/* Time */}
            <p className="text-gray-500 text-sm">
              🕒 {shop.openingTime || '--'} - {shop.closingTime || '--'}
            </p>

            {/* Tables */}
            <p className="text-gray-500 text-sm mt-1">
              🪑 {shop._count?.tables || 0} tables
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}