import { login } from "@/services/login";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const redirectUrl =
    request.cookies.get("redirect_to")?.value || new URL("/", request.url);
  const { searchParams } = new URL(request.url);

  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(redirectUrl);
  }

  const { access_token, decoded } = await login(code);

  return NextResponse.redirect(redirectUrl, {
    headers: {
      "Set-Cookie": `access_token=${access_token}; Path=/; Expires=${decoded.exp.toUTCString()}`,
    },
  });
}
