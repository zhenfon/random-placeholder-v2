import { pickRandom, buildImageUrl, corsHeaders, checkRateLimit } from '../_shared'

export const runtime = 'edge'

export async function GET(req: Request) {
  const rl = checkRateLimit(req)
  if (rl) return rl

  const image = pickRandom(1)[0]
  const url = buildImageUrl(req, image)

  return new Response(url, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'no-store',
      ...corsHeaders,
    },
  })
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders })
}
