const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

export async function fetchStickers(search = '', team = '') {
  const params = new URLSearchParams()
  if (search) params.set('search', search)
  if (team) params.set('team', team)
  const response = await fetch(`${API_URL}/stickers?${params.toString()}`)
  if (!response.ok) throw new Error('Erreur chargement stickers')
  return response.json()
}

export async function fetchStats(ownerName) {
  const response = await fetch(`${API_URL}/collection/${ownerName}/stats`)
  if (!response.ok) throw new Error('Erreur chargement stats')
  return response.json()
}

export async function updateCollection(payload) {
  const response = await fetch(`${API_URL}/collection`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  if (!response.ok) throw new Error('Erreur mise à jour collection')
  return response.json()
}
