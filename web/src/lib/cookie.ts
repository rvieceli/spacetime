export function getCookie(name: string): string | undefined {
  if (typeof window === "undefined") {
    const headers = require("next/headers");
    return headers.cookies().get(name)?.value;
  }

  const Cookies = require("js-cookie");
  return Cookies.get(name);
}


export function isAuthenticated(): boolean {
  return !!getCookie("access_token");
}