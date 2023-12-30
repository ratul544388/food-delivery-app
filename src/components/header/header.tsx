"use client";

import { useNavLinks } from "@/hooks/use-nav-links";
import { FullCartTypes } from "@/types";
import { User } from "@prisma/client";
import MaxWidthWrapper from "../max-width-wrapper";
import { MobileSidebar } from "../mobile-sidebar";
import { Badge } from "../ui/badge";
import { Cart } from "./cart";
import {Logo} from "./logo";
import NavLinks from "./nav-links";
import { NavSearch } from "./nav-search";
import { UserButton } from "./user-button";

interface HeaderProps {
  currentUser:
    | (User & {
        cartItems: FullCartTypes[];
      })
    | null;
}

const Header: React.FC<HeaderProps> = ({ currentUser }) => {
  const { isAdminRoute } = useNavLinks({ currentUser });
  return (
    <header className="sticky inset-x-0 top-0 border-b shadow-md z-50 w-full">
      <MaxWidthWrapper className="flex items-center justify-between h-[70px] bg-background">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <MobileSidebar currentUser={currentUser} />
              <Logo className="flex" />
            </div>
            <NavLinks currentUser={currentUser} />
            {isAdminRoute && <Badge className="sm:hidden">Admin</Badge>}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <NavSearch />
          <Cart cartItems={currentUser?.cartItems} currentUser={currentUser} />
          <UserButton currentUser={currentUser} />
        </div>
      </MaxWidthWrapper>
    </header>
  );
};

export default Header;
