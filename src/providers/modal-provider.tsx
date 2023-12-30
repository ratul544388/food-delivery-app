"use client";
import AddressModal from "@/components/modals/address-modal";
import { CancelOrderModal } from "@/components/modals/cancel-order-modal.";
import { DeleteFoodModal } from "@/components/modals/delete-food-modal";
import { DeleteReviewModal } from "@/components/modals/delete-review-modal";
import { useEffect, useState } from "react";

const ModalProvider = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <AddressModal />
      <CancelOrderModal />
      <DeleteFoodModal />
      <DeleteReviewModal />
    </>
  );
};

export default ModalProvider;
