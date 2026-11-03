"use client";

import { useEffect, type ReactNode } from "react";
import { useAnimate, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: ReactNode }) {
  const [scope, animate] = useAnimate<HTMLElement>();
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion !== false || window.location.hash || !scope.current) return;
    const transition = animate(
      scope.current,
      { opacity: [0.76, 1], y: [8, 0] },
      { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
    );
    return () => {
      transition.stop();
      if (scope.current) {
        scope.current.style.removeProperty("opacity");
        scope.current.style.removeProperty("transform");
      }
    };
  }, [animate, pathname, reducedMotion, scope]);

  return <main id="contenido" ref={scope}>{children}</main>;
}
