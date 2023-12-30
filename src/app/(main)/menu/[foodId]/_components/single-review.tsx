"use client";
import { ActionDropdownMenu } from "@/components/action-dropdown-menu";
import Photo from "@/components/photo";
import Star from "@/components/star";
import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { Review, User } from "@prisma/client";
import { format } from "date-fns";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

interface SingleReviewProps {
  review: Review & {
    user: User;
  };
  userReview?: boolean;
  className?: string;
}

const SingleReview: React.FC<SingleReviewProps> = ({
  review,
  userReview,
  className,
}) => {
  const router = useRouter();
  const { onOpen } = useModal();

  return (
    <div key={review.id} className={cn("flex flex-col text-sm", className)}>
      <div className="flex items-center gap-3">
        <Photo photo={review.user.imageUrl} size="AVATAR" />
        <h1 className="font-semibold">{review.user.name}</h1>
        {userReview && (
          <ActionDropdownMenu
            items={[
              {
                label: "Delete review",
                icon: Trash,
                onClick: () =>
                  onOpen("DELETE_REVIEW_MODAL", { reviewId: review.id }),
              },
            ]}
            className="ml-auto"
          />
        )}
      </div>
      <div className="flex items-center gap-1">
        <Star value={review.star} viewOnly />
        <p className="text-muted-foreground mt-1">
          {format(review.createdAt, "MM/dd/yyyy")}
        </p>
      </div>
      <p className="mt-1.5">{review.message}</p>
    </div>
  );
};

export default SingleReview;
