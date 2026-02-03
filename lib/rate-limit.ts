// Simple in-memory rate limiter for development
// In production, use a proper rate limiting service or Redis

interface RateLimitEntry {
  count: number
  resetTime: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

// Increased limits for development, stricter in production
const RATE_LIMIT_WINDOW = process.env.NODE_ENV === "production" ? 10 * 60 * 1000 : 1 * 60 * 1000 // 10 minutes (prod) or 1 minute (dev)
const RATE_LIMIT_MAX_REQUESTS = process.env.NODE_ENV === "production" ? 5 : 50 // 5 requests (prod) or 50 requests (dev)

export function checkRateLimit(ipHash: string): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now()
  const entry = rateLimitStore.get(ipHash)

  if (!entry || now > entry.resetTime) {
    // Create new entry or reset expired entry
    const newEntry: RateLimitEntry = {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    }
    rateLimitStore.set(ipHash, newEntry)
    return {
      allowed: true,
      remaining: RATE_LIMIT_MAX_REQUESTS - 1,
      resetTime: newEntry.resetTime,
    }
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime,
    }
  }

  entry.count++
  rateLimitStore.set(ipHash, entry)

  return {
    allowed: true,
    remaining: RATE_LIMIT_MAX_REQUESTS - entry.count,
    resetTime: entry.resetTime,
  }
}

// Clean up old entries periodically (in production, this would be handled by Redis TTL)
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key)
    }
  }
}, RATE_LIMIT_WINDOW)

