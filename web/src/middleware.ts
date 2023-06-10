import { NextRequest, NextResponse } from "next/server";
import { GITHUB_OAUTH_URL } from "./constants";

const MAX_AGE = 60 * 2;

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/memories")) {
    const isAuthenticated = request.cookies.has("access_token");

    if (!isAuthenticated) {
      return NextResponse.redirect(GITHUB_OAUTH_URL, {
        headers: {
          "Set-Cookie": `redirect_to=${request.url}; Path=/; HttpOnly; Max-Age=${MAX_AGE}`,
        },
      });
    }
  }

  if (pathname.startsWith("/api/proxy")) {
    const access_token = request.cookies.get("access_token")?.value;
    const response = NextResponse.next();
    if (access_token) {
      response.headers.set("Authorization", `Bearer ${access_token}`);
    }
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/memories/:path*", "/api/proxy/:path*"],
};
