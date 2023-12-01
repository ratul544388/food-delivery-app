"use client";

import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { cn } from "@/lib/utils";
import { Food } from "@prisma/client";
import axios from "axios";
import { Search, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDebounce } from "use-debounce";
import Photo from "../photo";
import { PulseLoader } from "react-spinners";
import { useRouter } from "next/navigation";

export const NavSearch = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState("");
  const [debouncedValue] = useDebounce(value, 500);
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useOnClickOutside(containerRef, () => setIsOpen(false));

  const handleSearch = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`/api/search?q=${debouncedValue}`);
      setFoods(data);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [debouncedValue]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && value) {
      router.push(`/menu/search?q=${value}`);
      setIsOpen(false);
    }
  };

  const handleClickSearchButton = () => {
    if (value) {
      router.push(`/menu/search?q=${value}`);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen && debouncedValue) {
      handleSearch();
    }
  }, [debouncedValue, isOpen, handleSearch]);

  return (
    <>
      <Search
        onClick={() => setIsOpen(true)}
        className={cn(
          "h-5 w-5 cursor-pointer text-muted-foreground hover:text-primary",
          isOpen && "hidden"
        )}
      />
      <X
        onClick={() => setIsOpen(false)}
        className={cn(
          "h-5 w-5 cursor-pointer text-primary hidden",
          isOpen && "block"
        )}
      />
      <div
        onKeyDown={handleKeyDown}
        ref={containerRef}
        className={cn(
          "absolute flex flex-col gap-1 items-center left-1/2 -translate-x-1/2 top-[0px] opacity-0 pointer-events-none transition-all w-[320px] sm:w-[400px]",
          isOpen && "pointer-events-auto top-[80px] opacity-100"
        )}
      >
        <input
          ref={inputRef}
          className="w-full h-10 outline-none rounded-lg ring-2 ring-offset-1 border pl-3 ring-primary"
          placeholder="Search cuisines..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Search
          onClick={() => setIsOpen(true)}
          className={cn(
            "h-5 w-5 absolute right-2 top-2.5 cursor-pointer text-primary"
          )}
        />
        <div
          ref={containerRef}
          className={cn(
            "w-full flex flex-col bg-background rounded-xl",
            value && "py-2"
          )}
        >
          <div
            className={cn(
              "flex items-center justify-between gap-3 hover:text-primary hover:bg-primary/5 cursor-pointer text-muted-foreground px-4 py-2",
              !value && "hidden"
            )}
          >
            <div className="flex items-center gap-3">
              <h1 className=" text-sm">Search {value}</h1>
              <Search onClick={handleClickSearchButton} className="h-4 w-4" />
            </div>
            <PulseLoader
              loading={isLoading}
              color="#E11D48"
              size={8}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
          {foods.map((food: Food) => (
            <div
              onClick={() => {
                router.push(`/menu/${food.id}`);
                setIsOpen(false);
              }}
              className="flex items-center gap-3 px-4 py-1.5 hover:bg-primary/5 cursor-pointer"
              key={food.id}
            >
              <Photo photo={food.photo} className="max-w-[40px] rounded-md" />
              <div className="flex flex-col">
                <h1 className="text-sm capitalize font-semibold line-clamp-1">
                  {food.name}
                </h1>
                <h1 className="text-xs text-primary line-clamp-1">
                  ${food.price}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
