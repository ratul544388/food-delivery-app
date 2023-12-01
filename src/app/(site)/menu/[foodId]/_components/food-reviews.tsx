"use client";

import Star from "@/components/star";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import LoadingButton from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { CurrentUser, FoodWithReview } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SingleReview from "./single-review";

const formSchema = z.object({
  star: z
    .number({
      required_error: "Rating must be in btweetn 1-5",
      invalid_type_error: "Rating must be in btweetn 1-5",
    })
    .max(400, { message: "400 Characters are allowed" }),
  message: z.string().optional(),
});

interface FoodReviewsProps {
  food: FoodWithReview;
  currentUser: CurrentUser | null;
}

const FoodReviews: React.FC<FoodReviewsProps> = ({ food, currentUser }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const userReview = food.reviews.find(
    (review) => review.userId === currentUser?.id
  );

  const hasPurchased = currentUser?.orders.some((order) => {
    return (
      order.status === "DELIVERED" &&
      order.orderItems.some((item) => {
        return item.foodId === food.id;
      })
    );
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      star: 0.5,
      message: "",
    },
  });

  useEffect(() => {
    if (userReview && isEditing) {
      form.setValue("star", userReview.star);
      form.setValue("message", userReview.message);
    }
  }, [userReview, form, isEditing]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (userReview) {
        await axios.patch(`/api/reviews/${userReview.id}`, {
          ...values,
          foodId: food.id,
        });
        setIsEditing(false);
      } else {
        await axios.post(`/api/reviews`, {
          ...values,
          foodId: food.id,
        });
      }
      form.reset();
      router.refresh();
      toast.success(
        userReview ? "Your feedback was Updated" : "Your feedback was submitted"
      );
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="flex flex-col gap-3 text-sm">
      <h1 className="text-2xl font-bold text-primary">Reviews</h1>
      <Separator />
      {!!food.reviews.length ? (
        <div className="grid gap-x-10 gap-y-6 md:grid-cols-2">
          {hasPurchased && (
            <>
              {!!userReview && !isEditing && (
                <div className="flex flex-col gap-3">
                  <h1 className="font-semibold text-primary">Your review</h1>
                  <SingleReview review={userReview} userReview />
                  <p
                    onClick={() => setIsEditing(true)}
                    className="mt-2 text-primary/80 hover:underline hover:text-primary/100 cursor-pointer"
                  >
                    Edit your review
                  </p>
                </div>
              )}
              {(!userReview || isEditing) && (
                <div className="flex justify-between gap-8">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="w-full flex flex-col gap-3"
                    >
                      <FormField
                        control={form.control}
                        name="star"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Star
                                size={32}
                                value={field.value}
                                onChange={field.onChange}
                                className=""
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea
                                placeholder="Give your review"
                                {...field}
                                className="w-full min-h-[120px]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="ml-auto mt-2 flex gap-3">
                        <Button
                          type="button"
                          onClick={() => {
                            form.reset();
                            setIsEditing(false);
                          }}
                          variant="ghost"
                          className={cn("hidden", isEditing && "block")}
                        >
                          Cancel
                        </Button>
                        <LoadingButton
                          label={cn(isEditing ? "Update" : "Submit")}
                          loadingLabel={cn(
                            isEditing ? "Updating..." : "Submiting..."
                          )}
                          isLoading={form.formState.isSubmitting}
                        />
                      </div>
                    </form>
                  </Form>
                </div>
              )}
            </>
          )}
          <div className="flex flex-col gap-3 border-t pt-3 md:border-t-0 md:pt-0 md:border-l md:pl-5">
            {userReview && (
              <h1 className="text-primary font-semibold">
                Other&apos;s review
              </h1>
            )}
            {food.reviews.map((review) => (
              <div className="space-y-3 " key={review.id}>
                <SingleReview
                  review={review}
                  className={cn(currentUser?.id === review.user.id && "hidden")}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="font-semibold text-muted-foreground">No reviews</p>
      )}
    </div>
  );
};

export default FoodReviews;
