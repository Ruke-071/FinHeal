"use client";
import { useMotionValue, useMotionTemplate, motion } from "motion/react";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export const EvervaultCard = ({ children, className }) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  // Start with a stable value so server and client HTML match,
  // then randomize only on the client after hydration.
  const [randomString, setRandomString] = useState("");

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    setRandomString(generateRandomString(1200));
  }, []);

  function onMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
    setRandomString(generateRandomString(1200));
  }

  return (
    <div
      className={cn(
        "p-[2px] rounded-3xl bg-transparent w-full",
        className
      )}
    >
      <div
        onMouseMove={onMouseMove}
        className="group/card rounded-3xl relative overflow-hidden bg-zinc-950 flex items-center justify-center min-h-[260px]"
      >
        <CardPattern
          mouseX={mouseX}
          mouseY={mouseY}
          randomString={randomString}
        />

        {/* ✅ THIS IS WHAT MAKES YOUR CONTENT VISIBLE */}
        <div className="relative z-10 w-full h-full p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export function CardPattern({ mouseX, mouseY, randomString }) {
  let maskImage = useMotionTemplate`radial-gradient(220px at ${mouseX}px ${mouseY}px, white, transparent)`;
  let style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 rounded-3xl [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-50" />

      <motion.div
        className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-500 to-blue-700 opacity-0 group-hover/card:opacity-100 backdrop-blur-xl transition duration-500"
        style={style}
      />

      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 mix-blend-overlay group-hover/card:opacity-100"
        style={style}
      >
        <p className="absolute inset-0 text-xs break-words whitespace-pre-wrap text-white font-mono font-bold p-4">
          {randomString}
        </p>
      </motion.div>
    </div>
  );
}

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export const generateRandomString = (length) => {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
