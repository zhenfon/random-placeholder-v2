# Random Placeholder V2

An open-source API that serves random placeholder images. Built with Next.js and deployed on Vercel's Edge Runtime for minimal latency.

**Live demo:** [random-placeholder-v2.vercel.app](https://random-placeholder-v2.vercel.app/)

## Features

- **Single image endpoint** — returns one random image URL as plain text
- **Batch endpoint** — returns multiple unique image URLs in a single request
- **Edge Runtime** — low-latency responses globally via Vercel's Edge Network
- **Rate limiting** — IP-based throttling for public consumers, with API key bypass for trusted integrations
- **CORS enabled** — usable from any origin

## API Reference

### `GET /api/random-image`

Returns the URL of a randomly selected image as plain text.

**Response:**

```
https://random-placeholder-v2.vercel.app/images/frieren.webp
```

**Headers:**

| Header | Value |
|--------|-------|
| `Content-Type` | `text/plain` |
| `Cache-Control` | `no-store` |

### `GET /api/random-images?count={n}`

Returns an array of unique random image URLs as JSON.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `count` | number | `6` | Number of unique images to return (max: pool size) |

**Response:**

```json
{
  "urls": [
    "https://random-placeholder-v2.vercel.app/images/frieren.webp",
    "https://random-placeholder-v2.vercel.app/images/makima.webp",
    "https://random-placeholder-v2.vercel.app/images/lucy.webp"
  ]
}
```

### Rate Limiting

Public requests are limited to **30 requests per minute** per IP address. Exceeding the limit returns a `429` response with a `Retry-After` header.

To bypass rate limiting, include a valid API key in the request header:

```
X-API-Key: your-api-key
```

The key is validated against the `API_SECRET_KEY` environment variable on the server.

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Edge Runtime)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Language:** TypeScript
- **Deployment:** [Vercel](https://vercel.com/)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/zhenfon/random-placeholder-v2.git
cd random-placeholder-v2
npm install
```

### Environment Variables

Copy the example file and fill in the values:

```bash
cp .env.example .env.local
```

| Variable | Description | Required |
|----------|-------------|----------|
| `API_SECRET_KEY` | Shared secret for API key authentication. Requests with a matching `X-API-Key` header bypass rate limiting. | No |

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Adding Images

Place image files in the `public/images/` directory. Supported formats: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`.

After adding or removing images, update the `IMAGES` array in `app/api/_shared.ts` to match.

## Project Structure

```
random-placeholder-v2/
├── app/
│   ├── api/
│   │   ├── _shared.ts              # Shared logic (image list, rate limiting, CORS)
│   │   ├── random-image/route.ts   # Single image endpoint
│   │   └── random-images/route.ts  # Batch endpoint
│   ├── layout.tsx
│   └── page.tsx                    # Interactive demo page
├── components/                     # UI components
├── public/
│   └── images/                     # Image pool
├── next.config.ts
└── package.json
```

## Contributing

Contributions are welcome. Please open an issue to discuss proposed changes before submitting a pull request.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

## License

This project is licensed under the [GNU General Public License v3.0](LICENSE).
