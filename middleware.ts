import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from '@supabase/ssr';
 
export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: any) {
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  // Check auth
  const { data: { session } } = await supabase.auth.getSession();

  // Redirect to login if not authenticated
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}
 
export const config = {
	matcher: ["/dashboard/:path*"], // Protect dashboard and all sub-routes
};