// import { useEffect, useState } from "react";

// export function useScroll() {
//   const [isHidden, setIsHidden] = useState(false);
//   const [lastScrollY, setLastScrollY] = useState(0);

//   const controlNavbar = () => {
//     if (window.scrollY > lastScrollY) {
//       // if scroll down hide the navbar
//       setIsHidden(true);
//     } else {
//       // if scroll up show the navbar
//       setIsHidden(false);
//     }

//     // remember current page location to use in the next move
//     setLastScrollY(window.scrollY);
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", controlNavbar);

//     // cleanup function
//     return () => {
//       window.removeEventListener("scroll", controlNavbar);
//     };
//   }, [lastScrollY]);

//   return isHidden;
// }
