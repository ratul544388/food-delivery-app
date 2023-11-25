import { CartItem, User } from "@prisma/client";
import MaxWidthWrapper from "../max-width-wrapper";
import Logo from "./logo";
import NavLinks from "./nav-links";
import { UserButton } from "./user-button";
import Cart from "./cart";
import MobileSidebar from "../mobile-sidebar";
import { FullCartTypes } from "@/types";

interface NavbarProps {
  currentUser:
    | (User & {
        cartItems: FullCartTypes[]
      })
    | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <nav className="fixed w-full top-0 h-[70px] bg-background z-50">
      <MaxWidthWrapper className="flex items-center justify-between border border-t-0 gap-8">
        <div className="flex items-center gap-3">
          <MobileSidebar currentUser={currentUser} />
          <div className="flex items-center gap-8">
            <Logo currentUser={currentUser} className="hidden xs:flex" />
            <NavLinks currentUser={currentUser} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Cart cartItems={currentUser?.cartItems} />
          <UserButton currentUser={currentUser} />
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
