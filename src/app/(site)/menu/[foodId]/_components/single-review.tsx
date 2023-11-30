import Photo from "@/components/photo";
import Star from "@/components/star";
import { cn } from "@/lib/utils";
import { Review, User } from "@prisma/client";
import { format } from "date-fns";

interface SingleReviewProps {
  review: Review & {
    user: User;
  };
  currentUser?: User | null;
}

const SingleReview: React.FC<SingleReviewProps> = ({ review, currentUser }) => {
  return (
    <div
      key={review.id}
      className={cn(
        "flex flex-col text-sm",
        currentUser?.id === review.user.id && "hidden"
      )}
    >
      <div className="flex items-center gap-3">
        <Photo photo={review.user.imageUrl} size="AVATAR" />
        <h1 className="font-semibold">{review.user.name}</h1>
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
