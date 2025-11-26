import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.API_URL || 'http://back:8080';

export async function GET() {
  const res = await fetch(`${BACKEND_URL}/todos`);
  const data = await res.json();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const res = await fetch(`${BACKEND_URL}/todos/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return NextResponse.json(await res.json());
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const res = await fetch(`${BACKEND_URL}/todos/del`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return NextResponse.json(await res.json());
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const res = await fetch(`${BACKEND_URL}/todos/mod`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return NextResponse.json(await res.json());
}
