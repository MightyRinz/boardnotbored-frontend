const BASE_URL = 'http://localhost:3001' // backend

export async function fetchGames() {
  const res = await fetch(`${BASE_URL}/boardgames`)
  return res.json()
}

export async function searchGames(q: string) {
  const res = await fetch(`${BASE_URL}/boardgames/search?q=${q}`)
  return res.json()
}

export async function getRecommend(userId: number) {
  const res = await fetch(`${BASE_URL}/user/${userId}/recommend`)
  return res.json()
}

export async function autoBooking(data: any) {
  const res = await fetch(`${BASE_URL}/booking/auto`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return res.json()
}

export async function fetchShopGames(shopId: number) {
  const res = await fetch(`http://localhost:3001/shops/${shopId}/games`, {
    cache: 'no-store',
  })
  return res.json()
}

export async function fetchShops() {
  const res = await fetch('http://localhost:3001/shops', {
    cache: 'no-store',
  })
  return res.json()
}