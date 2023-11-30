"use client";

import { categories } from "@/constants";
import { formatText } from "@/helper";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const Categories = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const isActive = (label: string) => {
    if (!searchParams.get("category") && label === "ALL") {
      return true;
    }
    return searchParams.get("category") === label.toLowerCase();
  };

  const handleClick = (category: string) => {
    let url = `/menu/?category=${category.toLowerCase()}`;
    if (category === "ALL") {
      url = "/menu";
    }
    router.push(url);
  };

  return (
    <div className="flex gap-4 overflow-x-auto scrollbar-thin">
      {categories.map((item) => (
        <div
          key={item}
          onClick={() => handleClick(item)}
          className={cn(
            "border whitespace-nowrap rounded-md py-0.5 px-2 bg-primary/5 hover:bg-primary/10 transition-colors duration-300 cursor-pointer",
            isActive(item) && "bg-primary/90 text-white hover:bg-primary"
          )}
        >
          {formatText(item)}
        </div>
      ))}
    </div>
  );
};

export default Categories;
