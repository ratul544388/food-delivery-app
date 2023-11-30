import { cn } from "@/lib/utils";
import Image from "next/image";

interface PhotoProps {
  photo: string;
  className?: string;
  alt?: string;
  size?: "AVATAR" | "XS" | "SM" | "MD" | "LG";
}

const Photo: React.FC<PhotoProps> = ({
  photo,
  className,
  alt = "Photo",
  size,
}) => {
  return (
    <div
      className={cn(
        "relative aspect-[6/5] w-full max-w-[350px] h-fit rounded-xl overflow-hidden",
        size === "AVATAR" && "min-w-[36px] w-9 aspect-square rounded-full",
        size === "XS" && "min-w-[50px] max-w-[50px]",
        size === "SM" && "min-w-[100px] max-w-[100px]",
        size === "MD" && "min-w-[180px] max-w-[220px] rounded-lg",
        size === "LG" && "w-full min-w-[300px]",
        className
      )}
    >
      <Image src={photo} alt={alt} fill className="object-cover" />
    </div>
  );
};

export default Photo;
