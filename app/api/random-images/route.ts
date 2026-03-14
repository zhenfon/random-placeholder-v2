import { IMAGES, pickRandom, buildImageUrl, corsHeaders, checkRateLimit } from '../_shared'

export const runtime = 'edge'

const MAX_COUNT = IMAGES.length

export async function GET(req: Request) {
  const rl = checkRateLimit(req)
  if (rl) return rl

  const { searchParams } = new URL(req.url)
  const raw = Number(searchParams.get('count'))
  const count = Number.isFinite(raw) && raw >= 1 ? Math.min(raw, MAX_COUNT) : 6

  const images = pickRandom(count)
  const urls = images.map((img) => buildImageUrl(req, img))

  return Response.json(
    { urls },
    {
      headers: {
        'Cache-Control': 'no-store',
        ...corsHeaders,
      },
    }
  )
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders })
}
