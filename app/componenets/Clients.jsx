"use client";
import Image from "next/image";
import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Guap from "../assets/guap.png";
import Flannels from "../assets/flannels.png";
import Boots from "../assets/boots.png";
import Apple from "../assets/apple.png";
import Nike from "../assets/nike.png";
import Vogue from "../assets/vogue.png";
import Harrods from "../assets/harrods.png";
import JD from "../assets/jd.png";

gsap.registerPlugin(ScrollTrigger);

function HeaderText({ text, identifier }) {
    return text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
            <span className={`inline-block ${identifier} word`}>
                {word.split("").map((char, j) => (
                    <span key={j} className={`inline-block ${identifier} char`}>
                        {char === " " ? "\u00A0" : char}
                    </span>
                ))}
            </span>
            &nbsp;
        </span>
    ));
}

export default function Clients() {
    const clientsRef = useRef(null);
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        gsap.set(".char.clients", { y: 100 });
        let ctx = gsap.context(() => {
            const animate = () => {
                const totalWidth = clientsRef.current.scrollWidth / 2;

                gsap.to(".row_1", {
                    x: -totalWidth,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top center",
                        end: "bottom top",
                        scrub: 2,
                    },
                });

                gsap.to(".row_2", {
                    x: totalWidth,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top center",
                        end: "bottom top",
                        scrub: 2,
                    },
                });

                gsap.to(".char.clients", {
                    y: 0,
                    duration: 1.5,
                    stagger: { amount: 0.5 },
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 95%",
                        end: "top top",
                        once: true,
                    },
                });
            };

            animate();

            window.addEventListener("resize", animate);

            return () => {
                window.removeEventListener("resize", animate);
                ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            };
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative clients_section w-full min-h-[50vh] lg:min-h-screen overflow-hidden"
        >
            <div className="min-h-[50vh] lg:min-h-screen flex flex-col gap-16 mx-auto w-11/12 overflow-hidden">
                <h2 className="text-2xl font-canela relative max-w-[10ch] tracking-tight pt-32 uppercase leading-tighter">
                    <HeaderText text="PREVIOUS CLIENTS" identifier="clients" />
                </h2>

                <div className="outer flex flex-col gap-4 client_container">
                    <div className="flex flex-col">
                        <div
                            ref={clientsRef}
                            className="row_1 flex flex-row gap-4"
                            aria-label="Previous clients logos row 1"
                        >
                            {[Guap, Flannels, Boots, Apple, Guap, Flannels, Boots, Apple].map((logo, i) => (
                                <div
                                    key={i}
                                    className="min-w-[33.3vw] md:min-w-[21.8vw] aspect-square flex rounded-2xl md:rounded-4xl justify-center px-4 py-4 items-center border border-secondary"
                                >
                                    <Image src={logo} alt="" quality={75} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div
                            className="row_2 flex-row-reverse flex gap-4"
                            aria-label="Previous clients logos row 2"
                        >
                            {[JD, Harrods, Vogue, Nike, JD, Harrods, Vogue, JD].map((logo, i) => (
                                <div
                                    key={i}
                                    className="min-w-[33.3vw] md:min-w-[21.8vw] aspect-square flex rounded-2xl md:rounded-4xl justify-center px-4 py-4 items-center border border-secondary"
                                >
                                    <Image src={logo} alt="" quality={75} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
