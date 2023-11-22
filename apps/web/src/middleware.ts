import { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookies = request.cookies;

  console.log("cookies", cookies);

  // Get the router from the context
}
