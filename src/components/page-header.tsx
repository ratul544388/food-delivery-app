import { LucideIcon, UtensilsCrossed } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  label: string;
  icon?: LucideIcon;
  actionLabel?: string;
  actionUrl?: string;
  actionIcon?: LucideIcon;
  actionVariant?: "default" | "outline" | "secondary" | "ghost";
}

const PageHeader: React.FC<PageHeaderProps> = ({
  label,
  icon: Icon = UtensilsCrossed,
  actionLabel,
  actionUrl,
  actionIcon: ActionIcon,
  actionVariant = "default",
}) => {
  return (
    <div className="flex justify-between items-center gap-3">
      <div className="text-2xl sm:text-3xl font-bold text-primary flex items-center gap-2">
        <Icon className="w-[22px] sm:h-[26px] h-[22px] sm:w-[26px]" />
        {label}
      </div>
      {actionLabel && actionUrl && (
        <Link
          href={actionUrl}
          className={cn(
            buttonVariants({
              variant: actionVariant,
            })
          )}
        >
          {ActionIcon && <ActionIcon className="h-4 w-4 mr-2" />}
          {actionLabel}
        </Link>
      )}
    </div>
  );
};

export default PageHeader;
