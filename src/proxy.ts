import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

//Public routes
const publicRoutes = ["/", "/login", "/register", "/not-authorized"];

export default async function middleware (req: NextRequest) {
    const { pathname } = req.nextUrl;

    //allow  public routes without session validate
    if (publicRoutes.includes(pathname)){
        return NextResponse.next();
    }

    //read session Token (NextAuth)
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    //if all it's ok  and is not a public route , redirect to login
    if (!token){
        return NextResponse.redirect(new URL("/login", req.url));
    }

    //protection by rol
    //add more roles if I need
    const role = token.role;

    //routes only for admin
    
    if (pathname.startsWith("/admin") && role !== "admin" ){
        return NextResponse.redirect(new URL("/not-authorized", req.url));
    }

    //Routes only for normal users
    if (pathname.startsWith("/dashboard") && !["user", "admin"].includes(role)){
        return NextResponse.redirect(new URL("/not-authorized", req.url));
    }
    //if all validations are  passed, so cotinue.
    return NextResponse.next();
}
 
//Active middleware for all routes, except assets
export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|api/auth).*)",
    ],
};