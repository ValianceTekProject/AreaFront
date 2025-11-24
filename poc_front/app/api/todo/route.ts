let todos: { id: number; title: string; done: boolean }[] = [];

export async function GET() {
  return Response.json(todos);
}

export async function POST(req: Request) {
  const body = await req.json();
  const item = { id: Date.now(), done: false, ...body };
  todos.push(item);
  return Response.json(item);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  todos = todos.filter((item) => item.id !== id);
  return Response.json({ success: true });
}

export async function PATCH(req: Request) {
  const { id, done } = await req.json();
  todos = todos.map((item) =>
    item.id === id ? { ...item, done } : item
  );
  return Response.json({ success: true });
}
