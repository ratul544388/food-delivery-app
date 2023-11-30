import PageHeader from "@/components/page-header";
import { Separator } from "@/components/ui/separator";
import { Utensils } from "lucide-react";
import FoodForm from "../../_components/food-form";

const Page = () => {
  return (
    <div className="flex flex-col h-full gap-3">
      <PageHeader
        label="Create cuisine"
        icon={Utensils}
        actionLabel="Cancel"
        actionUrl="/admin/cuisines"
        actionVariant="outline"
      />
      <Separator />
      <FoodForm />
    </div>
  );
};

export default Page;
