import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file');

  return NextResponse.json('ok');
  // const form = new multiparty.Form();

  // form.parse(req as any, (err, fields, files) => {
  //   console.log(files.length);
  //   return NextResponse.json('ok');
  // });
}
