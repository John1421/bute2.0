"use client";

import { cn } from "@/app/lib/utils";
import Image, { StaticImageData } from "next/image";
import React, { Suspense, useEffect, useState } from "react";


export type CarousselItem = {
    role?: string;
    name: string;
    quote: string;
    img: StaticImageData;
}

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: CarousselItem[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow" | "slow2";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else if (speed === "slow"){
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }else{
        containerRef.current.style.setProperty("--animation-duration", "90s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className="w-40 md:w-60 h-40 md:h-60 max-w-full relative"
            key={idx}
          >
            <blockquote className="flex flex-col z-10 justify-end h-full p-4 rounded-2xl bg-black/40">
              <Image src={item.img} alt={item.name} fill className="-z-10 absolute rounded-2xl"/>
              <div
                aria-hidden="true"
                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>
                <span className="relative z-20 text-sm leading-[1.6] ">
                  <text className="text-surface-500 font-extrabold text-large">{item.name}</text>
                </span>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
