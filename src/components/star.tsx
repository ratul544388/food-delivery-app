"use client";

import { cn } from "@/lib/utils";
import { useEffect } from "react";
import ReactStars from "react-stars";

interface StarProps {
  value: number;
  onChange?: (value: number) => void;
  size?: number;
  className?: string;
  viewOnly?: boolean;
}

const Star: React.FC<StarProps> = ({
  value,
  onChange,
  size = 20,
  className,
  viewOnly,
}) => {
  useEffect(() => {
    if (value === 0) {
      onChange?.(0.5);
    }
  }, [value, onChange]);

  return (
    <ReactStars
      count={5}
      value={value}
      onChange={(value) => onChange?.(value)}
      size={size}
      color2={"#ffd700"}
      className={cn(viewOnly && "pointer-events-none", className)}
    />
  );
};

export default Star;
