import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const API = process.env.NEXT_PUBLIC_API_URL;

    const body = await req.json();
    const searchTerm = body.searchTerm || "";
    
    if (!token) {
      return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
    }

    const r = await fetch(`${API}/api/solicitacoes?nome=${searchTerm}`, {
      headers: { Cookie: `token=${token}` },
      credentials: "include",
    });

    const text = await r.text();
    let data;
    try {
      data = JSON.parse(text);  
    } catch {
      console.error("Resposta do backend não é JSON:", text);
      return NextResponse.json(
        { message: "Resposta inesperada do backend" },
        { status: r.status }
      );
    }

    if (!r.ok) {
      return NextResponse.json(
        { message: data.message || "Erro ao buscar solicitações" },
        { status: r.status }
      );
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Erro ao buscar solicitações:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
