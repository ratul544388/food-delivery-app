"use client";

import { Food, Size } from "@prisma/client";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { z } from "zod";

import ImageUpload from "@/components/image-upload";
import Select from "@/components/select";
import { Input } from "@/components/ui/input";
import { categories } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import FoodSize from "./food-size";
import { useEffect } from "react";
import LoadingButton from "@/components/loading-button";
import { FullFoodTypes } from "@/types";

export const FoodFormSchema = z.object({
  photo: z.string({ required_error: "Photo is required" }),
  name: z.string().min(3, {
    message: "Name is too short",
  }),
  category: z.string({ required_error: "Category is requried" }),
  price: z.coerce.number({
    required_error: "Price is required",
    invalid_type_error: "Price can only be number",
  }),
});

interface FoodFormProps {
  food?: FullFoodTypes;
  addSizeAndExtra?: boolean;
}

const FoodForm: React.FC<FoodFormProps> = ({ food }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FoodFormSchema>>({
    resolver: zodResolver(FoodFormSchema),
    defaultValues: {
      photo: "",
      name: "",
      category: "",
      price: undefined,
    },
  });

  useEffect(() => {
    if (food) {
      form.setValue("name", food.name);
      form.setValue("category", food.category);
      form.setValue("photo", food.photo);
      form.setValue("price", food.price);
    }
  }, [form, food]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof FoodFormSchema>) => {
    try {
      if (food) {
        await axios.patch(`/api/food/${food.id}`, {
          ...values,
        });
        router.push("/cuisines");
        toast.success("Cuisine updated");
        router.refresh();
      } else {
        const { data } = await axios.post("/api/food", {
          ...values,
        });
        toast.success("Cuisine was created");
        router.push(`/food/${data.id}/update`);
        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Form {...form}>
      <div className="flex flex-col gap-8 ">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-8 sm:grid-cols-2"
        >
          <FormField
            control={form.control}
            name="photo"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Photo</FormLabel>
                <FormControl>
                  <ImageUpload value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Cuisine's name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    items={categories}
                    onChange={field.onChange}
                    value={field.value}
                    placeholder="Select a category"
                    filter
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Cuisine's price"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
        {food && <FoodSize sizes={food.sizes} foodId={food.id} />}
        <LoadingButton
          onClick={form.handleSubmit(onSubmit)}
          label={food ? "Update" : "Create"}
          loadingLabel={food ? "Updating..." : "Creating..."}
          isLoading={isLoading}
          className="ml-auto sm:col-span-2"
        />
      </div>
    </Form>
  );
};

export default FoodForm;
