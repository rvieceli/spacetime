import { NextRequest, NextResponse } from "next/server";
import { GITHUB_OAUTH_URL } from "./constants";

const MAX_AGE = 60 * 2;

export default function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.has("access_token");

  if (!isAuthenticated) {
    return NextResponse.redirect(GITHUB_OAUTH_URL, {
      headers: {
        "Set-Cookie": `redirect_to=${request.url}; Path=/; HttpOnly; Max-Age=${MAX_AGE}`,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/memories/:path*",
};
