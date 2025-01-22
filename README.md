# Random Placeholder V2

Random Placeholder V2 is an open-source Next.js project that generates random placeholder images from a local collection. This project is designed for developers who need random placeholder images for testing or prototyping their web applications.

## Features

- **Random Image API**: An API endpoint (`/api/random-image`) that returns the URL of a randomly selected image.
- **Interactive Frontend**: A simple interface to preview, copy, and shuffle placeholder images.
- **Optimized for Developers**: Easy to use and extend.
- **Lightweight**: Uses local images stored in the `public/images` directory.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **UI Components**: Built with [ShadCN UI](https://shadcn.dev/).
- **Icons**: [Lucide React](https://lucide.dev/) for lightweight and customizable icons.
- **React Version**: React 18+
- **Deployment**: Optimized for [Vercel](https://vercel.com/).

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/random-placeholder-v2.git
   cd random-placeholder-v2
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Add Your Images**:
   Place your images in the `public/images` directory. Supported formats include `.jpg`, `.jpeg`, `.png`, `.gif`, and `.webp`.

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Usage

### Endpoint

`GET /api/random-image`

### Response

- **Success**:
  ```json
  {
    "url": "https://your-domain.com/images/example.jpg"
  }
  ```

- **Error**:
  ```json
  {
    "error": "No images found"
  }
  ```

## How It Works

1. **Image Storage**:
   - Images are stored in the `public/images` directory.

2. **Random Image Selection**:
   - The API reads all files in the `public/images` directory, filters for valid image extensions, and selects one at random.

3. **Frontend Integration**:
   - The API is called on the frontend to fetch and display the random image.

## Project Structure

```
random-placeholder-v2/
├── app/
│   ├── api/
│   │   └── random-image/
│   │       └── route.ts   # API to fetch a random image
│   └── page.tsx          # Frontend interface
├── public/
│   └── images/           # Directory to store placeholder images
├── components/           # Reusable UI components
├── hooks/                # Custom React hooks
├── styles/               # Global styles
├── next.config.js        # Next.js configuration
└── package.json          # Project dependencies
```

## Demo

Check out the live demo on [Vercel](https://random-placeholder-v2.vercel.app/).

## Contribution

Contributions are welcome! If you have suggestions, feature requests, or bug reports, please open an issue or submit a pull request.

### Steps to Contribute

1. Fork the repository.
2. Create a new branch.
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes.
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to the branch.
   ```bash
   git push origin feature/your-feature
   ```
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [ShadCN UI](https://shadcn.dev/)
- [Lucide React](https://lucide.dev/)

---

Enjoy using Random Placeholder V2! If you find this project helpful, please give it a ⭐ on GitHub!

