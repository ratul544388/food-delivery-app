"use client";
import Loader from "@/components/loader";
import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function Page() {
  const { theme } = useTheme();
  return (
    <>
      <ClerkLoading>
        <Loader />
      </ClerkLoading>
      <ClerkLoaded>
        <SignIn
          afterSignInUrl="/"
          appearance={{
            baseTheme: theme === "dark" ? dark : undefined,
          }}
        />
      </ClerkLoaded>
    </>
  );
}
