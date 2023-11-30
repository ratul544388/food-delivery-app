import {
  InvalidateQueryFilters,
  useMutation as useQueryMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useModal } from "./use-modal-store";

export function useMutation({
  api,
  queryKey,
  success,
  error,
  method,
  data,
  refresh,
  closeModal,
}: {
  api: string;
  queryKey?: string;
  success?: string;
  error?: string;
  method: "post" | "delete" | "patch";
  data?: any;
  refresh?: boolean;
  closeModal?: boolean;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { onClose } = useModal();

  const { mutate, isPending } = useQueryMutation({
    mutationFn: async () =>
      await axios.request({
        url: api,
        method,
        data,
      }),
    onSettled: () => {
      closeModal && onClose();
      refresh && router.refresh();
      queryKey &&
        queryClient.invalidateQueries([queryKey] as InvalidateQueryFilters);
    },
    onSuccess: () => success && toast.success(success),
    onError: () => toast.error(error || "Something went wrong"),
  });

  return { mutate, isPending };
}
