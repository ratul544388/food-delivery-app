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
    disabled?: boolean;
  }[];
  className?: string;
  contentWidth?: number;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  items,
  triggerIcon: TriggerIcon = MoreVertical,
  className,
  contentWidth,
}) => {
  const [open, setOpen] = useState(false);
  const handleClick = (onClick: () => void) => {
    onClick();
    setOpen(false);
  };
  return (
    <Popover open={open} onOpenChange={() => setOpen(!open)}>
      <PopoverTrigger
        className={cn(
          "outline-none text-muted-foreground border rounded-full p-2 hover:bg-accent",
          className
        )}
      >
        <TriggerIcon className="h-4 w-4" />
      </PopoverTrigger>
      <PopoverContent
        className={cn("w-[120px] p-0 text-sm font-semibold")}
        align="end"
        style={{ width: `${contentWidth}px` }}
      >
        {items.map((item) => (
          <div
            key={item.label}
            onClick={() => handleClick(() => item.onClick())}
            className={cn(
              "px-3 py-2 hover:bg-accent cursor-pointer flex items-center gap-2",
              item.disabled && "pointer-events-none opacity-60"
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
