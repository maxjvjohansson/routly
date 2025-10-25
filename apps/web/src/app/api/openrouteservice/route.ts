import { NextResponse } from "next/server";
import { fetchRouteWithElevation } from "@routly/lib/api/openRouteService";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { coordinates, profile } = body;

    if (!coordinates) {
      return NextResponse.json(
        { error: "Missing coordinates" },
        { status: 400 }
      );
    }

    const data = await fetchRouteWithElevation({ coordinates, profile });
    return NextResponse.json(data);
  } catch (err: any) {
    console.error("ORS Combined API error:", err);
    return NextResponse.json(
      { error: err.message, details: err.toString() },
      { status: 500 }
    );
  }
}
