import { mongooseConnect } from '@/lib/mongoose';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';
import DeleteProductPage from '../../products/delete/[...id]/page';

export async function POST(req: Request) {
  await mongooseConnect();

  const { title, description, price, images } = await req.json();
  // console.log({ title, description, price });
  const productDoc = await Product.create({
    title,
    description,
    price,
    images,
  });

  return NextResponse.json(productDoc);
}

export async function PUT(req: Request) {
  await mongooseConnect();

  const { _id, title, description, price, images } = await req.json();
  await Product.updateOne(
    // { _id: _id },
    // { title: title, description: description, price: price }
    { _id },
    { title, description, price, images }
  );

  return NextResponse.json(true);
}

export async function GET(req: Request) {
  await mongooseConnect();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (id) {
    return NextResponse.json(await Product.findById(id));
  } else {
    return NextResponse.json(await Product.find());
  }
}

export async function DELETE(req: Request) {
  await mongooseConnect();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (id) {
    await Product.deleteOne({ _id: id });
    return NextResponse.json(true);
  }
}
