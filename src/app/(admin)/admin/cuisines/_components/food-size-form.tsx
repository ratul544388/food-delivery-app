"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { z } from "zod";

import Select from "@/components/select";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FoodSize, Size } from "@prisma/client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingButton from "@/components/loading-button";

interface CuisineSizeProps {
  isAdding: boolean;
  onCancel: () => void;
  foodId: string;
  size?: Size;
}

const FoodSizeForm: React.FC<CuisineSizeProps> = ({
  isAdding,
  onCancel,
  foodId,
  size,
}) => {
  const router = useRouter();

  const formSchema = z.object({
    size: z.nativeEnum(FoodSize, { required_error: "Size is required" }),
    price: z.coerce.number({ required_error: "Price is required" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      size: undefined,
      price: undefined,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/food/${foodId}/size`, {
        ...values,
      });
      onCancel();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (size) {
      form.setValue("size", size.size);
      form.setValue("price", size.price);
    }
  }, [form, size]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-6 sm:grid-cols-2 w-full"
      >
        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onChange={field.onChange}
                  items={Object.values(FoodSize).map((item) => item)}
                  placeholder="Select size"
                  disabled={isLoading}
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
                  isLoading={isLoading}
                  type="number"
                  placeholder="Cuisine's price"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4 ml-auto sm:col-span-2">
          <Button
            disabled={isLoading}
            onClick={() => onCancel()}
            type="button"
            variant="outline"
          >
            Cancel
          </Button>
          <LoadingButton
            label={size ? "Uplate" : "Add"}
            loadingLabel={size ? "Uplating..." : "Addting..."}
            isLoading={isLoading}
          />
        </div>
      </form>
    </Form>
  );
};

export default FoodSizeForm;
