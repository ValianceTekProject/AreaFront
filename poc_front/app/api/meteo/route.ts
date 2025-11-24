import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const lat = searchParams.get("lat") || "44.833328";
  const lon = searchParams.get("lon") || "-0.56667";

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=precipitation,rain,snowfall,cloud_cover`;

  const response = await fetch(url);
  const data = await response.json();

  return NextResponse.json(data);
}
