"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface AvatarProps {
  image?: string;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ image, className }) => {
  return (
    <div
      className={cn(
        "aspect-[6/5] w-full rounded-full relative overflow-hidden",
        className
      )}
    >
      <Image
        src={image || "/images/placeholder.jpg"}
        alt="Avatar"
        className="object-cover"
        fill
      />
    </div>
  );
};

export default Avatar;
