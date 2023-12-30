"use client";

import { LucideIcon, MoreVertical } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface DropdownMenuProps {
  triggerIcon?: LucideIcon;
  items: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    disabled?: boolean;
  }[];
  className?: string;
}

export const ActionDropdownMenu: React.FC<DropdownMenuProps> = ({
  items,
  triggerIcon: TriggerIcon = MoreVertical,
  className,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={cn(className)}>
        <Button
          size="icon"
          variant="ghost"
          className="focus-visible:ring-0 focus-visible:ring-offset-0 rounded-full"
        >
          <TriggerIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {items.map((item) => (
          <DropdownMenuItem
            key={item.label}
            onClick={item.onClick}
            disabled={item.disabled}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
