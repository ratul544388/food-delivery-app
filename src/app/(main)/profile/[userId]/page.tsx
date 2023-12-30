import Loader from "@/components/loaders/loader";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { getCurrentUser } from "@/lib/current-user";
import { ClerkLoaded, ClerkLoading, UserProfile } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { userId: string } }) => {
  const currentUser = await getCurrentUser();
  if (currentUser?.id !== params.userId) {
    redirect(`/profile/${currentUser?.id}`);
  }
  return (
    <MaxWidthWrapper className="flex items-center justify-center">
      <ClerkLoading>
        <Loader />
      </ClerkLoading>
      <ClerkLoaded>
        <UserProfile />
      </ClerkLoaded>
    </MaxWidthWrapper>
  );
};

export default Page;
