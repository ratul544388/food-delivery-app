"use client";

import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import MaxWidthWrapper from "./max-width-wrapper";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  const icons = [
    {
      icon: Facebook,
      href: "/",
    },
    {
      icon: Twitter,
      href: "/",
    },
    {
      icon: Linkedin,
      href: "/",
    },
    {
      icon: Instagram,
      href: "/",
    },
  ];

  const labels = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Menu",
      href: "/",
    },
    {
      label: "Contact",
      href: "/",
    },
    {
      label: "About",
      href: "/",
    },
    {
      label: "Help",
      href: "/",
    },
  ];

  return (
    <footer className="flex mt-[150px] flex-col gap-3 items-center bg-zinc-900 pt-12">
      <div className="flex gap-3">
        {icons.map((item, index) => (
          <Link
            key={index}
            href={pathname}
            className={cn(
              buttonVariants({
                size: "icon",
              }),
              "rounded-full"
            )}
          >
            <item.icon className="h-4 w-4 text-white" />
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-3">
        {labels.map((item, index) => (
          <Link
            key={index}
            href={pathname}
            className="font-semibold hover:underline text-white text-sm"
          >
            {item.label}
          </Link>
        ))}
      </div>
      <div className="flex flex-col mt-8 w-full gap-2 py-4 items-center from-gray-900 to-gray-600 bg-gradient-to-r">
        <h1 className="text-sm font-semibold text-white">
          Savor Every Bite, Delivered with Delight
        </h1>
        <p className="text-sm text-white/70">
          Quick Bite © 2023. Flavorful Moments, Legal and Protected.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
