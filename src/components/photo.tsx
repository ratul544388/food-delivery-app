import { cn } from "@/lib/utils";
import Image from "next/image";

interface PhotoProps {
  photo: string;
  className?: string;
  alt?: string;
}

const Photo: React.FC<PhotoProps> = ({ photo, className, alt = "Photo" }) => {
  return (
    <div
      className={cn(
        "relative w-full aspect-[6/5] max-w-[300px] rounded-xl overflow-hidden",
        className
      )}
    >
      <Image src={photo} alt={alt} fill className="object-cover" />
    </div>
  );
};

export default Photo;
