import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface LoadingButtonProps {
  label: string;
  loadingLabel: string;
  isLoading: boolean;
  variant?: "default" | "outline" | "secondary" | "ghost";
  className?: string;
  onClick?: () => void;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  label,
  loadingLabel,
  onClick,
  isLoading,
  variant = "default",
  className,
}) => {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      disabled={isLoading}
      className={cn(className)}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <Loader2
            className={cn(
              "h-4 w-4 animate-spin text-white",
              variant !== "default" && "text-primary"
            )}
          />
          {loadingLabel}
        </div>
      ) : (
        `${label}`
      )}
    </Button>
  );
};

export default LoadingButton;
