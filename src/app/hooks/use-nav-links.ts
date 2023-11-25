import { adminNavLinks, userNavLinks } from "@/constants";
import { User } from "@prisma/client";
import { usePathname } from "next/navigation";

export function useNavLinks({ currentUser }: { currentUser: User | null }) {
  const pathname = usePathname();
  const isActive = (href: string) => {
    if (pathname === href) {
      return true;
    }
    return pathname.includes(href) && href !== "/";
  };

  const isAdminRoute = adminNavLinks.some((link) =>
    pathname.includes(link.href)
  );

  const navLinks =
    currentUser?.isAdmin && isAdminRoute ? adminNavLinks : userNavLinks;

  return { navLinks, isActive };
}
