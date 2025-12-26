import { NextResponse } from 'next/server'
import { cookies, headers } from 'next/headers'

export async function GET() {
  const cookieStore = await cookies()
  const headersList = await headers()
  
  // Get all cookies
  const allCookies = cookieStore.getAll()
  
  // Calculate total size
  let totalSize = 0
  const cookieDetails = allCookies.map(cookie => {
    const size = cookie.name.length + cookie.value.length
    totalSize += size
    return {
      name: cookie.name,
      valueLength: cookie.value.length,
      size,
    }
  })
  
  // Get Cookie header raw value
  const rawCookieHeader = headersList.get('cookie') || ''
  
  return NextResponse.json({
    totalCookies: allCookies.length,
    totalSize,
    rawCookieHeaderLength: rawCookieHeader.length,
    cookies: cookieDetails,
    // Show first 500 chars of raw cookie header for debugging
    rawCookiePreview: rawCookieHeader.substring(0, 500),
  })
}

