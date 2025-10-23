import { NextResponse } from "next/server";
import { fetchRoute } from "@routly/lib/api/openRouteService";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = await fetchRoute(body);

    return NextResponse.json(data);
  } catch (err: any) {
    console.error("ORS API error:", err);
    console.error("Error stack:", err.stack);
    return NextResponse.json(
      { error: err.message, details: err.toString() },
      { status: 500 }
    );
  }
}
