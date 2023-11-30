"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  address: z
    .string({
      required_error: "Address is required",
      invalid_type_error: "Address is required",
    })
    .min(10, { message: "Address must be at lease 10 characters in length" })
    .max(50, { message: "Address can not be longer than 50 characters" }),
  phone: z.string({ required_error: "Phone is required" }).min(10).max(11),
});

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useModal } from "@/hooks/use-modal-store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import LoadingButton from "../loading-button";

const AddressModal = () => {
  const { isOpen, type, data, onClose } = useModal();
  const hasAddress = data?.user?.address;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (data.user) {
      form.setValue("address", data.user.address as string);
      form.setValue("phone", data.user.phone as string);
    }
  }, [data, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await axios.patch(`/api/shipping-info`, {
        ...values,
      });
      toast.success(
        hasAddress
          ? "Address updated successfully."
          : "Address added successfully"
      );
      onClose();
      form.reset();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog
      open={isOpen && type === "ADDRESS_MODAL"}
      onOpenChange={() => onClose()}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {hasAddress
              ? "Change shipping address"
              : "Add Your shipping address"}
          </DialogTitle>
          <DialogDescription>
            Please provide your shipping address in full details including
            District, street, zip code etc.
          </DialogDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-8"
            >
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        autoFocus={false}
                        placeholder="Enter your full address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter your phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <LoadingButton
                label={hasAddress ? "Update" : "Add"}
                loadingLabel={hasAddress ? "Updating..." : "Adding..."}
                isLoading={isLoading}
                className="ml-auto"
              />
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddressModal;
