"use client";
import { cn } from "@/lib/utils";
import { PuffLoader } from "react-spinners";

const Loader = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "fixed z-10 inset-0 flex items-center justify-center",
        className
      )}
    >
      <PuffLoader color="#E11D48" />
    </div>
  );
};

export default Loader;
