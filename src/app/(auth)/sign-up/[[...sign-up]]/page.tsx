"use client";
import Loader from "@/components/loaders/loader";
import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

export default function Page() {
  const { theme } = useTheme();
  return (
    <>
      <ClerkLoading>
        <Loader />
      </ClerkLoading>
      <ClerkLoaded>
        <SignUp
          afterSignInUrl="/dashboard"
          appearance={{
            baseTheme: theme === "dark" ? dark : undefined,
          }}
        />
      </ClerkLoaded>
    </>
  );
}
