"use client";

import { Button } from "@/components/ui/button";
import { useOptimistic } from "react";
import { handleTest } from "./action";

const TestForm = ({ count }: { count: number }) => {
  const [optimisticCount, addOptimisticCount] = useOptimistic(
    count,
    (state, amount: number) => state + amount
  );

  const handleClick = async (amount: number) => {
    addOptimisticCount(amount);
    await handleTest(amount);
  };
  return (
    <div className="flex items-center gap-3">
      <Button onClick={() => handleClick(1)}>+</Button>
      {optimisticCount}
      <Button onClick={() => handleClick(-1)}>-</Button>
    </div>
  );
};

export default TestForm;
