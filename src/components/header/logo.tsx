"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  image?: string;
  className?: string;
}

export const Logo = ({ image, className }: LogoProps) => {
  return (
    <Link
      href={"/"}
      className={cn("flex items-center gap-2 relative w-fit", className)}
    >
      <Image
        src={image || "/images/logo_1.png"}
        alt="Logo"
        width={28}
        height={28}
        className="opacity-100 absolute top-2.5 left-1"
      />
      <div className="font-semibold flex items-center left-3 text-lg">
        <div className="text-5xl text-primary">Q</div>
        uick<span className="text-primary">Bite</span>
      </div>
    </Link>
  );
};
