import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET(req: Request) {
    try {
        // Resolve the path to the public/images directory
        const imagesDir = path.join(process.cwd(), 'public/images');

        // Read all files from the directory
        const files = fs.readdirSync(imagesDir);

        // Filter to include only image files (you can add more extensions if needed)
        const images = files.filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));

        if (images.length === 0) {
            return NextResponse.json({ error: 'No images found' }, { status: 404 });
        }

        // Get the host URL from the request headers
        const host = req.headers.get('host');
        const protocol = host?.includes('localhost') ? 'http' : 'https';

        // Get a random image from the list
        const randomImage = images[Math.floor(Math.random() * images.length)];

        // Construct the full URL to the image
        const imageUrl = `${protocol}://${host}/images/${randomImage}`;

        // Return the image URL as a plain text response with CORS headers
        return new Response(imageUrl, {
            headers: {
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': '*', // Allow all origins
                'Access-Control-Allow-Methods': 'GET', // Allow only GET requests
                'Access-Control-Allow-Headers': 'Content-Type', // Allow specific headers
            },
        });
    } catch (error) {
        console.error('Error fetching images:', error);
        return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
    }
}
