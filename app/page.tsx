"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { IconCopy } from "@tabler/icons-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [imageApiUrl, setImageApiUrl] = useState<string | null>(null);

  // Fetch random image from API
  const fetchRandomImage = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/random-image");
      if (!response.ok) throw new Error("Failed to fetch image");

      const data = await response.text();
      setImageUrl(data);
    } catch (error) {
      const err = error as Error;
      toast.error(`Failed to fetch image: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Set API URL and fetch the initial random image
  useEffect(() => {
    if (typeof window !== "undefined") {
      setImageApiUrl(`${window.location.origin}/api/random-image`);
    }
    fetchRandomImage();
  }, [fetchRandomImage]);

  // Copy API URL to clipboard
  const copyToClipboard = async () => {
    try {
      if (imageApiUrl) {
        await navigator.clipboard.writeText(imageApiUrl);
        toast.success("URL copied to clipboard!");
      }
    } catch (error) {
      const err = error as Error;
      toast.error(`Failed to copy URL: ${err.message}`);
    }
  };

  return (
    <div className="flex flex-grow justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Preview Placeholder Image</CardTitle>
          <CardDescription>Instantly generate random placeholder images for your projects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-1">
              <Input value={imageApiUrl || ""} readOnly />
              <Button variant="outline" size="icon" onClick={copyToClipboard}>
                <IconCopy className="size-4" />
              </Button>
            </div>

            <div className="w-full flex justify-center mt-6">
              {isLoading ? (
                <AspectRatio ratio={1 / 1} className="w-[300px] h-[300px]">
                  <Skeleton className="w-full h-full rounded-lg" />
                </AspectRatio>
              ) : (
                imageUrl && (
                  <AspectRatio ratio={1 / 1} className="w-[300px] h-[300px]">
                    <Image
                      src={imageUrl}
                      alt="Random Placeholder"
                      width={300}
                      height={300}
                      className="object-cover rounded-lg w-[300px] h-[300px]"
                    />
                  </AspectRatio>
                )
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col justify-between gap-3">
          <Button className="w-full" onClick={fetchRandomImage}>
            Shuffle
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
