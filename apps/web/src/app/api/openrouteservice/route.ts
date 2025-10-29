import { NextResponse } from "next/server";
import { fetchRouteWithElevation } from "@routly/lib/api/openRouteService";

export async function POST(req: Request) {
  try {
    const { start, end, distance, profile, seed } = await req.json();

    if (!start) {
      return NextResponse.json(
        { error: "Missing start point" },
        { status: 400 }
      );
    }

    const data = await fetchRouteWithElevation({
      start,
      end,
      distance,
      profile,
      seed,
    });
    return NextResponse.json(data);
  } catch (err: any) {
    console.error("ORS Combined API error:", err);
    return NextResponse.json(
      { error: err.message, details: err.toString() },
      { status: 500 }
    );
  }
}
