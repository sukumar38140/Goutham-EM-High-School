import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const TOKEN_COOKIE_NAME = 'ghs_admin_token';

export function proxy(request: NextRequest) {
  const token = request.cookies.get(TOKEN_COOKIE_NAME)?.value;
  const path = request.nextUrl.pathname;

  // Protect all dashboard routes
  if (path.startsWith('/admin/dashboard')) {
    if (!token) {
      // Redirect to login page, preserving requested URL in redirect query if desired
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect logged-in admin away from login page to dashboard
  if (path === '/admin/login') {
    if (token) {
      const dashboardUrl = new URL('/admin/dashboard', request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
}

// Specify matcher paths to run middleware only on relevant admin routes
export const config = {
  matcher: [
    '/admin/dashboard/:path*',
    '/admin/login'
  ],
};
