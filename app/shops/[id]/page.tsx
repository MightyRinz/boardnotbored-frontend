'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { fetchShopGames, fetchShops } from '../../../lib/api'

export default function ShopDetail() {
  const params = useParams()
  const shopId = Number(params.id)

  const [shop, setShop] = useState<any>(null)
  const [games, setGames] = useState<any[]>([])

  useEffect(() => {
    // โหลดร้าน
    fetchShops().then(data => {
      const found = data.find((s: any) => s.id === shopId)
      setShop(found)
    })

    // โหลดเกม
    fetchShopGames(shopId).then(setGames)
  }, [shopId])

  if (!shop) return <div className="p-6">Loading...</div>

  return (
    <div className="p-6">
      {/* 🏪 Shop Info */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{shop.name}</h1>

        <span
          className={`px-2 py-1 text-xs rounded-full ${
            shop.isOpen
              ? 'bg-green-100 text-green-600'
              : 'bg-red-100 text-red-500'
          }`}
        >
          {shop.isOpen ? 'OPEN' : 'CLOSED'}
        </span>

        <p className="text-gray-600 mt-2">📍 {shop.address}</p>
        <p className="text-gray-500">
          🕒 {shop.openingTime} - {shop.closingTime}
        </p>
      </div>

      {/* 🎮 Game List */}
      <h2 className="text-xl font-semibold mb-3">Games in this shop</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {games.map(g => (
          <div
            key={g.id}
            className="border rounded-lg p-3 shadow-sm"
          >
            <h3 className="font-medium text-sm">{g.game.name}</h3>

            <p className="text-xs text-gray-500">
              ⭐ {g.game.bayesAverage?.toFixed(1)}
            </p>
          </div>
        ))}
      </div>

      {/* 🪑 Booking Button */}
      <div className="mt-6">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          onClick={() =>
            alert('Next step: booking page 🔥')
          }
        >
          จองโต๊ะ
        </button>
      </div>
    </div>
  )
}