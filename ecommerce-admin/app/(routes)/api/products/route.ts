import { mongooseConnect } from '@/lib/mongoose';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

await mongooseConnect();

export async function POST(req: Request) {
  const { title, description, price } = await req.json();

  const productDoc = await Product.create({
    title,
    description,
    price,
  });

  return NextResponse.json(productDoc);
}

export async function GET() {
  return NextResponse.json(await Product.find());
}
