"use client";
import Image from "next/image";
import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import WorksOne from "../assets/works_1.png";
import WorksTwo from "../assets/works_2.png";
import WorksThree from "../assets/works_3.png";
import WorksFour from "../assets/works_4.png";
import WorksFive from "../assets/works_5.png";
import WorksSix from "../assets/works_6.png";

gsap.registerPlugin(ScrollTrigger);

export default function Works() {
  const sectionRef = useRef(null);
  const horizontalRef = useRef(null);

  const works = [
    { image: WorksOne, title: "WOMAN OF THE EVENING", subtitle: "CREATIVE • DIRECTION • BRANDING" },
    { image: WorksTwo, title: "UNFILTERED", subtitle: "CAMPAIGN • DESIGN" },
    { image: WorksThree, title: "ASPIRING OF WILSON", subtitle: "CREATIVE DIRECTION • FILM" },
    { image: WorksFour, title: "MIDNIGHT CITY", subtitle: "PHOTOGRAPHY • ART DIRECTION" },
    { image: WorksFive, title: "POOLSIDE", subtitle: "VISUAL IDENTITY • EDITORIAL" },
    { image: WorksSix, title: "MOMENTUM", subtitle: "MARKETING • STRATEGY" },
  ];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const animate = () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // ✅ Kill all triggers before setting new ones

        const totalWidth = horizontalRef.current.scrollWidth;
        const scrollDistance = totalWidth - window.innerWidth;
        const isMobile = window.innerWidth <= 768;

        gsap.to(horizontalRef.current, {
          x: -scrollDistance,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: isMobile ? "top 25%" : "top 3%",
            end: () => `+=${totalWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      };

      animate();
      ScrollTrigger.refresh();

      window.addEventListener("resize", animate);

      return () => {
        window.removeEventListener("resize", animate);
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen md:min-h-[50vh] lg:min-h-screen overflow-hidden bg-[#0f0f0f]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 py-8 px-4">
        <h2 className="text-white text-2xl leading-tighther font-semibold">Selected Works</h2>
      </div>

      {/* Scrollable Row */}
      <div className="overflow-hidden">
        <div
          ref={horizontalRef}
          className="flex gap-12 px-4"
         
        >
          {works.map((item, i) => (
            <div
              key={i}
              className="min-w-[25vw] flex-shrink-0 flex  flex-col items-start"
            >
              <Image src={item.image} alt={item.title} className="self-start w-[90%] h-auto" />
              <div className="flex flex-col">
                <span className="text-xs text-secondary tracking-tight">{item.subtitle}</span>
                <span className="text-smd md:text-lg text-primary font-canela md:-mt-2">{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
