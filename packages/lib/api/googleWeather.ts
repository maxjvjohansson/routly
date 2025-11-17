import Constants from "expo-constants";

export interface WeatherData {
  temperature: number | null;
  windSpeed: number | null;
  windDirection: number | null;
  windCardinal: string | null;
  humidity: number | null;
  condition: string | null;
  feelsLike: number | null;
  precipitationChance: number | null;
  pressure: number | null;
  icon?: string | null;
  raw?: any;
}

const BASE_URL = "https://weather.googleapis.com/v1";
const API_KEY =
  process.env.GOOGLE_WEATHER_API_KEY ||
  process.env.EXPO_PUBLIC_GOOGLE_WEATHER_API_KEY ||
  process.env.NEXT_PUBLIC_GOOGLE_WEATHER_API_KEY ||
  Constants.expoConfig?.extra?.googleWeatherApiKey;

if (!API_KEY) {
  console.warn("Missing Google Weather API key");
}

export async function fetchWeather(
  latitude: number,
  longitude: number
): Promise<WeatherData> {
  const url = `${BASE_URL}/currentConditions:lookup?key=${API_KEY}&location.latitude=${latitude}&location.longitude=${longitude}`;
  const res = await fetch(url);

  if (!res.ok) {
    const txt: string = await res.text();
    throw new Error(`Weather API failed ${res.status}: ${txt}`);
  }

  const data = await res.json();
  const current = data;

  // Google Weather: wind.speed.value is in km/h, convert to m/s for the app
  const windSpeedKmh: number | null =
    current?.wind?.speed?.value != null ? current.wind.speed.value : null;

  const windSpeedMs: number | null =
    windSpeedKmh != null ? Number((windSpeedKmh / 3.6).toFixed(1)) : null;

  return {
    temperature: current?.temperature?.degrees ?? null,
    windSpeed: windSpeedMs,
    windDirection: current?.wind?.direction?.degrees ?? null,
    windCardinal: current?.wind?.direction?.cardinal ?? null,
    humidity: current?.relativeHumidity ?? null,
    condition: current?.weatherCondition?.description?.text ?? null,
    icon: current?.weatherCondition?.iconBaseUri ?? null,
    feelsLike: current?.feelsLikeTemperature?.degrees ?? null,
    precipitationChance: current?.precipitation?.probability?.percent ?? null,
    pressure: current?.airPressure?.meanSeaLevelMillibars ?? null,
    raw: data,
  };
}
