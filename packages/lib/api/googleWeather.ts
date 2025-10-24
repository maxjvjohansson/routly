import Constants from "expo-constants";

const BASE_URL = "https://weather.googleapis.com/v1";
const API_KEY =
  process.env.GOOGLE_WEATHER_API_KEY ||
  process.env.EXPO_PUBLIC_GOOGLE_WEATHER_API_KEY ||
  process.env.NEXT_PUBLIC_GOOGLE_WEATHER_API_KEY ||
  Constants.expoConfig?.extra?.googleWeatherApiKey;

if (!API_KEY) {
  console.warn("Missing Google Weather API key");
}

export async function fetchWeather(latitude: number, longitude: number) {
  try {
    const url = `${BASE_URL}/weather?location.latitude=${latitude}&location.longitude=${longitude}&key=${API_KEY}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Weather API failed: ${res.status}`);
    }

    const data = await res.json();
    return {
      temperature: data?.currentWeather?.temperature?.value,
      windSpeed: data?.currentWeather?.wind?.speed?.value,
      windDirection: data?.currentWeather?.wind?.direction?.value,
      raw: data,
    };
  } catch (error) {
    console.error("Weather fetch error:", error);
    throw error;
  }
}
