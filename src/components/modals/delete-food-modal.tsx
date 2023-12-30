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

export const DeleteFoodModal = () => {
  const { isOpen, type, data, onClose } = useModal();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/food/${data.foodId}`);
    },
    onSuccess: () => {
      toast.success("Food was deleted");
      router.refresh();
      onClose();
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return (
    <Dialog
      open={isOpen && type === "DELETE_FOOD_MODAL"}
      onOpenChange={() => onClose()}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolute sure?</DialogTitle>
          <DialogDescription>Delete the food permanently.</DialogDescription>
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
