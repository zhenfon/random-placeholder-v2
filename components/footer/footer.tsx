"use client";

import { useEffect, useState } from "react";
import { IconBrandGithub } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

export default function Footer() {
  const [isFooterVisible, setIsFooterVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;

      if (currentScrollY < 0 || currentScrollY > maxScrollY) {
        return;
      }

      if (currentScrollY - lastScrollY > 3) {
        setIsFooterVisible(false);
      } else if (lastScrollY - currentScrollY > 3) {
        setIsFooterVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div
      className={`w-full fixed bottom-0 transition-opacity duration-300 ease-in-out ${
        isFooterVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <Separator />
      <div className="px-3 py-1 flex justify-between items-center bg-background">
        <div>
          <span className="text-sm font-medium">Built with</span>
          <HoverCard>
            <HoverCardTrigger
              render={
                <Button className="pl-1 text-sm font-medium" variant="link" />
              }
            >
              shadcn/ui
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="flex items-center justify-between gap-3">
                <Link href="https://x.com/shadcn" target="_blank">
                  <Button variant="link" className="text-sm pl-1">
                    Twitter/X
                  </Button>
                </Link>
                <Separator orientation="vertical" />
                <Link href="https://ui.shadcn.com/" target="_blank">
                  <Button variant="link" className="text-sm pl-1">
                    Website
                  </Button>
                </Link>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>

        <div>
          <Link href="https://github.com/zhenfon/random-placeholder-v2" target="_blank">
            <Button variant="ghost" size="icon">
              <IconBrandGithub className="size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
