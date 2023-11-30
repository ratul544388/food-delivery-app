"use client";

import axios from "axios";
import JoditEditor from "jodit-react";

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
import LoadingButton from "@/components/loading-button";
import Select from "@/components/select";
import { Input } from "@/components/ui/input";
import { categories } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Food } from "@prisma/client";

export const FoodFormSchema = z.object({
  photo: z.string({ required_error: "Photo is required" }),
  name: z.string().min(3, {
    message: "Name is too short",
  }),
  category: z.string({ required_error: "Category is requried" }).min(1, {message: "Category must be selected"}),
  price: z.coerce.number({
    required_error: "Price is required",
    invalid_type_error: "Price can only be number",
  }),
  description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description is required",
    })
    .min(100, { message: "Min 100 characters are required" })
    .max(1200, {
      message: "Description cannot be more than 1200 characters in length",
    }),
});

interface FoodFormProps {
  food?: Food;
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
      description: "",
    },
  });

  useEffect(() => {
    if (food) {
      form.setValue("name", food.name);
      form.setValue("category", food.category);
      form.setValue("photo", food.photo);
      form.setValue("price", food.price);
      form.setValue("description", food?.description || "");
    }
  }, [form, food]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof FoodFormSchema>) => {
    try {
      if (food) {
        await axios.patch(`/api/admin/foods/${food.id}`, {
          ...values,
        });
        router.push("/admin/cuisines");
        toast.success("Cuisine updated");
        router.refresh();
      } else {
        await axios.post("/api/admin/foods", {
          ...values,
        });
        toast.success("Cuisine was created");
        router.push(`/admin/cuisines`);
        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-8 sm:grid-cols-2 bg-background p-5 rounded-xl"
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
                <Input autoCapitalize="words" placeholder="Cuisine's name" {...field} />
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
                <Input type="number" placeholder="Cuisine's price" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <JoditEditor
                  value={field.value}
                  onBlur={(newContent) => field.onChange(newContent)}
                  onChange={(newContent) => {
                    field.onChange(newContent);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton
          onClick={form.handleSubmit(onSubmit)}
          label={food ? "Update" : "Create"}
          loadingLabel={food ? "Updating..." : "Creating..."}
          isLoading={isLoading}
          className="ml-auto sm:col-span-2"
        />
      </form>
    </Form>
  );
};

export default FoodForm;
