import { NextResponse } from "next/server";
import { fetchWeather } from "@routly/lib/api/googleWeather";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon)
    return NextResponse.json({ error: "Missing lat/lon" }, { status: 400 });

  try {
    const data = await fetchWeather(parseFloat(lat), parseFloat(lon));
    return NextResponse.json(data);
  } catch (err: any) {
    console.error("Weather API route error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
