"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import LoadingButton from "../loading-button";
import { Button } from "../ui/button";

export const CancelOrderModal = () => {
  const { isOpen, type, data, onClose } = useModal();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      await axios.patch(`/api/admin/orders/${data.orderId}`, {
        status: "CANCELED",
      });
    },
    onSuccess: () => {
      toast.success("Order marked as delivered");
      router.refresh();
      onClose();
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return (
    <Dialog
      open={isOpen && type === "CANCEL_ORDER_MODAL"}
      onOpenChange={() => onClose()}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolute sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will cancel the order.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-between">
          <Button disabled={isPending} onClick={onClose} variant="ghost">
            Close
          </Button>
          <LoadingButton
            label="Confirm"
            isLoading={isPending}
            onClick={() => mutate()}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
