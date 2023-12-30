import MaxWidthWrapper from "@/components/max-width-wrapper";
import { getCurrentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  if (!currentUser?.isAdmin) {
    redirect("/");
  }
  return <MaxWidthWrapper className="pb-10">{children}</MaxWidthWrapper>;
}
