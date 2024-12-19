import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import Link from "../../../models/Link";

// Método GET: Busca um link específico baseado na chave
export async function GET(req: Request) {
  await dbConnect();

  // Extrai a query string da URL
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");

  if (!key) {
    return NextResponse.json({ error: "Key is required" }, { status: 400 });
  }

  try {
    // Busca o link no banco de dados
    const link = await Link.findOne({ key });

    if (!link) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: link }, { status: 200 });
  } catch (error) {
    console.error("Error fetching link:", error);
    return NextResponse.json(
      { error: "Failed to fetch link" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  await dbConnect();
  console.log("User connected.");

  function generateKey(lenght: number): string {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-";
    let key = "";

    for (let i = 0; i < lenght; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      key += chars[randomIndex];
    }

    return key;
  }

  try {
    const { link } = await req.json();
    const key = generateKey(8);

    if (!key || !link) {
      return NextResponse.json(
        { error: "Title are required" },
        { status: 400 }
      );
    }

    if (link.length < 25) {
      return NextResponse.json(
        { error: "Your link must be longer than 20 characters." },
        { status: 400 }
      );
    }

    const newLink = new Link({ key, link });
    await newLink.save();

    return NextResponse.json(
      { message: "Link created successfully", post: newLink },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving link:", error);
    return NextResponse.json(
      { error: "Failed to create link" },
      { status: 500 }
    );
  }
}

export function OPTIONS() {
  return NextResponse.json({ message: "OK" }, { status: 200 });
}
