"use client";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const Loader = ({ className }: { className?: string }) => {
  return (
    <div className={cn("fixed inset-0 flex items-center justify-center lg:pl-[300px]", className)}>
      <Loader2
        className={cn("h-10 w-10 text-primary animate-spin")}
      />
    </div>
  );
};

export default Loader;
