"use client";

import { cn } from "@/lib/utils";
import { LucideIcon, MoreVertical } from "lucide-react";
import { useState } from "react";
import Icon from "./icon";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface DropdownMenuProps {
  triggerIcon?: LucideIcon;
  items: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isLoading?: boolean;
  }[];
  className?: string;
  noBorder?: boolean;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  items,
  triggerIcon: TriggerIcon = MoreVertical,
  noBorder,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const handleClick = (onClick: () => void) => {
    onClick();
    setOpen(false);
  };
  return (
    <Popover open={open} onOpenChange={() => setOpen(!open)}>
      <PopoverTrigger className={cn("outline-none", className)}>
        <Icon
          icon={TriggerIcon}
          className={cn("text-muted-foreground", noBorder && "border-none")}
        />
      </PopoverTrigger>
      <PopoverContent
        className={cn("w-[120px] p-0 text-sm font-semibold")}
        align="end"
      >
        {items.map((item) => (
          <div
            key={item.label}
            onClick={() => handleClick(() => item.onClick())}
            className={cn(
              "px-3 py-1.5 hover:bg-primary/5 cursor-pointer flex items-center gap-2",
              item.isLoading && "pointer-events-none opacity-80"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default DropdownMenu;
