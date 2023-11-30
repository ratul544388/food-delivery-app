"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { useMutation } from "@/hooks/use-mutation";
import LoadingButton from "../loading-button";
import { Button } from "../ui/button";

const CancelOrderModal = () => {
  const { isOpen, type, data, onClose } = useModal();

  const { mutate, isPending } = useMutation({
    api: `/api/admin/orders/cancel`,
    method: "patch",
    data: {
      orderId: data.orderId,
    },
    queryKey: "something",
    closeModal: true,
    refresh: true,
    success: "Order canceled successfully",
  });

  return (
    <Dialog
      open={isOpen && type === "CANCEL_ORDER_MODAL"}
      onOpenChange={() => onClose()}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you absolute sure you want to cancel the order?
          </DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <div className="flex justify-between">
          <Button onClick={onClose} variant="ghost">
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

export default CancelOrderModal;
