import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface FoodDescriptionProps {
  foodName: string;
  description: string;
  className?: string;
}

const FoodDescription: React.FC<FoodDescriptionProps> = ({
  foodName,
  description,
  className,
}) => {
  return (
    <div className={cn("flex flex-col  gap-2", className)}>
      <h1 className="font-bold text-2xl">
        About <span className="text-primary">{foodName}</span>
      </h1>
      <Separator />
      <div dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  );
};

export default FoodDescription;
