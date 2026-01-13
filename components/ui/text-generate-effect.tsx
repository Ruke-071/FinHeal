"use client";

import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();

  // ✅ Use <br> as an explicit line-break token
  const tokens = (words || "").split(" ");

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration,
        delay: stagger(0.15),
      }
    );
  }, [scope, animate, filter, duration]);

  return (
    <motion.div
      ref={scope}
      className={cn("font-bold leading-tight tracking-tight", className)}
    >
      {tokens.map((token, idx) => {
        // ✅ HARD LINE BREAK SUPPORT
        if (token === "<br>") {
          return <br key={`br-${idx}`} />;
        }

        return (
          <motion.span
            key={token + idx}
            className="opacity-0 inline-block mr-2"
            style={{
              filter: filter ? "blur(10px)" : "none",
            }}
          >
            {token}
          </motion.span>
        );
      })}
    </motion.div>
  );
};
