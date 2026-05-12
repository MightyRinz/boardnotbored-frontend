'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { fetchShopGames, fetchShops } from '../../../lib/api'

export default function ShopDetail() {
    const params = useParams()
    const router = useRouter()

    const shopId = Number(params.id)

    const [shop, setShop] = useState<any>(null)
    const [games, setGames] = useState<any[]>([])

    useEffect(() => {
        fetchShops().then(data => {
            const found = data.find((s: any) => s.id === shopId)
            setShop(found)
        })

        fetchShopGames(shopId).then(setGames)
    }, [shopId])

    if (!shop) {
        return (
            <div className="p-6">
                Loading...
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100">

            {/* HERO IMAGE */}
            <div className="relative w-full h-72">

                <img
                    src={
                        shop.imageUrl ||
                        'https://placehold.co/1200x600'
                    }
                    className="w-full h-full object-cover"
                />

                {/* DARK OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                {/* BACK BUTTON */}
                <button
                    onClick={() => router.back()}
                    className="
                        absolute
                        top-4
                        left-4
                        w-10
                        h-10
                        rounded-full
                        bg-white/90
                        flex
                        items-center
                        justify-center
                        shadow-lg
                    "
                >
                    ←
                </button>

                {/* SHOP INFO ON IMAGE */}
                <div className="absolute bottom-6 left-6 text-white">

                    <h1 className="text-3xl font-bold">
                        {shop.name}
                    </h1>

                    <p className="mt-2 text-sm opacity-90">
                        📍 {shop.address || 'No address'}
                    </p>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="
                bg-white
                rounded-t-3xl
                -mt-6
                relative
                z-10
                p-6
            ">

                {/* STATUS */}
                <div className="flex justify-between items-center">

                    <div>
                        <p className="text-gray-500 text-sm">
                            🕒 {shop.openingTime || '--'} - {shop.closingTime || '--'}
                        </p>

                        <p className="text-gray-500 text-sm mt-1">
                            🪑 {shop._count?.tables || 0} tables
                        </p>
                    </div>

                    {shop.isOpen ? (
                        <div className="
                            bg-green-100
                            text-green-700
                            px-4
                            py-2
                            rounded-full
                            text-sm
                            font-semibold
                        ">
                            OPEN
                        </div>
                    ) : (
                        <div className="
                            bg-red-100
                            text-red-700
                            px-4
                            py-2
                            rounded-full
                            text-sm
                            font-semibold
                        ">
                            CLOSED
                        </div>
                    )}
                </div>

                {/* GAMES */}
                <div className="mt-8">

                    <h2 className="text-xl font-bold mb-4">
                        🎲 Games
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                        {games.map(g => (
                            <div
                                key={g.id}
                                className="
                                    bg-white
                                    rounded-2xl
                                    overflow-hidden
                                    shadow-sm
                                    border
                                "
                            >

                                {/* GAME IMAGE */}
                                <div className="
                                    h-32
                                    bg-gray-200
                                    flex
                                    items-center
                                    justify-center
                                    text-gray-400
                                    text-sm
                                ">
                                    No Image
                                </div>

                                {/* GAME INFO */}
                                <div className="p-3">

                                    <h3 className="font-semibold text-sm">
                                        {g.game.name}
                                    </h3>

                                    <p className="text-xs text-gray-500 mt-1">
                                        ⭐ {g.game.bayesAverage?.toFixed(1)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* BOOK BUTTON */}
                <div className="mt-8">

                    <button
                        className="
                            w-full
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            py-4
                            rounded-2xl
                            font-semibold
                            shadow-lg
                            transition
                        "
                    >
                        จองโต๊ะ
                    </button>
                </div>
            </div>
        </div>
    )
}