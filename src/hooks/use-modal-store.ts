import { User } from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "ADDRESS_MODAL"
  | "LOGOUT_MODAL"
  | "CONFIRM_ORDER_MODAL"
  | "CANCEL_ORDER_MODAL";

interface ModalData {
  user?: User;
  orderId?: string;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
