import { FoodSize } from "@prisma/client";
import * as z from "zod";

export const cuisineFormSchema = z.object({
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

export const cuisineSizeFormSchema = z.object({
  size: z.nativeEnum(FoodSize, { required_error: "Size is required" }),
  price: z.coerce.number({ required_error: "Price is required" }),
});

export const cuisineFormExtraSchema = z.object({
  title: z.string({ required_error: "Title is requried" }),
  size: z.nativeEnum(FoodSize, { required_error: "Size is required" }),
  price: z.coerce.number({ required_error: "Price is required" }),
});
