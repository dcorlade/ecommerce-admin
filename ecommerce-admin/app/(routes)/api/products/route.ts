import { mongooseConnect } from '@/lib/mongoose';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  await mongooseConnect();
  const { title, description, price } = await req.json();

  const productDoc = await Product.create({
    title,
    description,
    price,
  });

  return NextResponse.json(productDoc);
}
