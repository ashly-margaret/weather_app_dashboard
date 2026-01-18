

export interface Location {
  id: number
  name: string
  country: string
  latitude: number
  longitude: number
  admin1?: string
}

export async function searchCountry(
  query: string
): Promise<Location[]> {
  if (!query || query.trim().length < 2) return []

  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?` +
      new URLSearchParams({
        name: query,
        count: "5",
        language: "en",
        format: "json",
      }),
    { cache: "no-store" }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch locations")
  }

  const data = await res.json()

  return data.results ?? []
}

export async function getWeather(lat: number, lon: number) {
  const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
  if (!res.ok) {
    throw new Error("Failed to fetch weather data");
  }
  return res.json();
}
