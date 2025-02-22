import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { accessToken ,refreshToken,isSuperuser} = await req.json();

  if (!accessToken || !refreshToken ) {
    return NextResponse.json({ message: 'Access token is required' }, { status: 400 });
  }

  // Set the cookie
  const response = NextResponse.json({ message: 'Cookie set successfully' },{ status: 200 });
  response.cookies.set('accessToken', accessToken, {
    httpOnly: true,
    secure: true,
    path: '/',
    sameSite: 'lax',
  });
  response.cookies.set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    path: '/',
    sameSite: 'lax',
  });
  response.cookies.set('isSuperUser', isSuperuser, {
    httpOnly: true,
    secure: true,
    path: '/',
    sameSite: 'lax',
  });

  return response;
}
