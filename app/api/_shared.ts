// Hardcoded image list — avoids fs.readdirSync on every request
export const IMAGES = [
  'anzu.webp',
  'frieren.webp',
  'frieren2.webp',
  'hayasaka.webp',
  'lucy.webp',
  'mai.webp',
  'makima.webp',
  'ubel.webp',
] as const

export const corsHeaders: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-API-Key',
}

/** Pick `count` unique random images from the pool */
export function pickRandom(count: number): string[] {
  const clamped = Math.min(Math.max(1, count), IMAGES.length)
  const pool = [...IMAGES]

  // Fisher-Yates partial shuffle
  for (let i = pool.length - 1; i > pool.length - 1 - clamped; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }

  return pool.slice(pool.length - clamped)
}

/** Build the full public URL for an image filename */
export function buildImageUrl(req: Request, filename: string): string {
  const host = req.headers.get('host') ?? 'localhost:3000'
  const protocol = host.includes('localhost') ? 'http' : 'https'
  return `${protocol}://${host}/images/${filename}`
}

// ---------------------------------------------------------------------------
// Rate limiting — sliding window per IP, bypassed with API key
// ---------------------------------------------------------------------------
const WINDOW_MS = 60_000 // 1 minute
const MAX_REQUESTS = 30 // per window for public users

// In-memory store — resets on cold start, which is acceptable for basic abuse prevention
const hits = new Map<string, { count: number; resetAt: number }>()

// Periodic cleanup to prevent unbounded growth (runs at most once per window)
let lastCleanup = Date.now()
function cleanup() {
  const now = Date.now()
  if (now - lastCleanup < WINDOW_MS) return
  lastCleanup = now
  for (const [key, val] of hits) {
    if (now > val.resetAt) hits.delete(key)
  }
}

export function checkRateLimit(req: Request): Response | null {
  // API key bypass — unlimited access for trusted consumers
  const apiKey = req.headers.get('x-api-key')
  if (apiKey && apiKey === process.env.API_SECRET_KEY) {
    return null
  }

  cleanup()

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'

  const now = Date.now()
  const entry = hits.get(ip)

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return null
  }

  entry.count++

  if (entry.count > MAX_REQUESTS) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000)
    return new Response(
      JSON.stringify({ error: 'Too many requests. Please try again later.' }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(retryAfter),
          ...corsHeaders,
        },
      }
    )
  }

  return null
}
