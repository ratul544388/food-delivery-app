"use client";

import { CartItem, User } from "@prisma/client";
import MaxWidthWrapper from "../max-width-wrapper";
import Logo from "./logo";
import NavLinks from "./nav-links";
import { UserButton } from "./user-button";
import Cart from "./cart";
import MobileSidebar from "../mobile-sidebar";
import { FullCartTypes } from "@/types";
import { NavSearch } from "./nav-search";
import { useNavLinks } from "@/hooks/use-nav-links";
import { Badge } from "../ui/badge";

interface NavbarProps {
  currentUser:
    | (User & {
        cartItems: FullCartTypes[];
      })
    | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const { isAdminRoute } = useNavLinks({ currentUser });
  return (
    <div className="sticky inset-x-0 top-0 border-b shadow-md z-50 w-full">
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
    </div>
  );
};

export default Navbar;
