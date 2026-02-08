const BASE_URL = '/api'

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    const message = data?.error?.message || data?.error || `Request failed: ${response.status}`
    throw new Error(message)
  }

  return response.json()
}
