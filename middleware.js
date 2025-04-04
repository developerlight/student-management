import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });
    const data = await supabase.auth.getUser();
    // console.log('session', session);
    console.log('session:', data );
    // if (!session) {
    //     const loginUrl = new URL('/login', req.url);
    //     return NextResponse.redirect(loginUrl);
    // }
    return res;
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/students/:path*',
        '/dashboard/:path*',
        '/profile/:path*',
        '/settings/:path*',
    ]
}