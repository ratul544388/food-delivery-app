import Footer from "@/components/footer";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { ReactNode } from "react";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col" style={{ minHeight: "calc(100vh + 500px)" }}>
      <MaxWidthWrapper className="flex-1 flex-grow">{children}</MaxWidthWrapper>
      <Footer />
    </div>
  );
}
