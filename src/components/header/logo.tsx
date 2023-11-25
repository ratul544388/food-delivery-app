import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  image?: string;
  currentUser: User | null;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ image, currentUser, className }) => {
  return (
    <Link
      href={currentUser?.isAdmin ? "admin/dashboard" : "/"}
      className={cn("flex items-center gap-2 relative", className)}
    >
      <Image
        src={image || "/images/logo.png"}
        alt="Logo"
        width={25}
        height={25}
        className="opacity-100 absolute top-2 left-1"
      />
      <div className="font-semibold flex items-center left-3 text-lg">
        <div className="text-5xl text-primary">Q</div>
        uick<span className="text-primary">Bite</span>
      </div>
    </Link>
  );
};

export default Logo;
