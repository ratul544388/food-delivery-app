import Loader from "@/components/loaders/loader";
import { getCurrentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { ClerkLoaded, ClerkLoading, UserProfile } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { userId: string } }) => {
  const currentUser = await getCurrentUser();
  if (currentUser?.id !== params.userId) {
    redirect(`/profile/${currentUser?.id}`);
  }
  return (
    <div className="flex items-center justify-center">
      <ClerkLoading>
        <Loader />
      </ClerkLoading>
      <ClerkLoaded>
        <UserProfile />
      </ClerkLoaded>
    </div>
  );
};

export default Page;
