import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Button } from "./ui/button";

interface IconProps {
  icon: LucideIcon;
  onClick?: () => void;
  iconSize?: number;
  className?: string;
  disabled?: boolean;
}

const Icon: React.FC<IconProps> = ({
  icon: Icon,
  onClick,
  iconSize,
  className,
  disabled,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "p-2 rounded-full bg-background hover:bg-accent cursor-pointer border-[1.5px]",
        disabled && "opacity-80 pointer-events-none",
        className
      )}
    >
      <Icon className="h-4 w-4" style={{ width: iconSize, height: iconSize }} />
    </div>
  );
};

export default Icon;
