"use client"
import Image from "next/image";
import Logo from "./assets/logo.png"
import { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";
import { motion } from "motion/react"
import Link from "next/link";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitAndUnderline from "./componenets/SplitAndUnderline"
import Works from "./componenets/Works";
import Bg from "./assets/service_bg.png";
import Clients from "./componenets/Clients";
import SplitText from "./componenets/SplitText";
gsap.registerPlugin(ScrollTrigger);
export default function Home() {

  const logo = useRef()
  const heroSpacer = useRef()
  const bgVideo = useRef()
  const about = useRef()
  const services = useRef()
  const contact = useRef()


  useLayoutEffect(() => {
    const logoEl = logo.current;
    const videoEl = bgVideo.current;
    const spacerEl = heroSpacer.current;
    const aboutEl = about.current;
    const serviceEl = services.current;
    const contactEl = contact.current;

    const isMobile = window.innerWidth <= 768;

    // Initial setup
    gsap.set(logoEl, {
      scale: isMobile ? 3 : 8,
      y: isMobile ? "45vh" : "50vh",
      opacity: 1,
      visibility: "visible",
    });
    gsap.set(".word.about", { visibility: "visible" });
    gsap.set(".char.about, .services.char", { y: 100 });
    gsap.set(".service", { opacity: 0, visibility: "visible" });

    // Shared animations for all viewports
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: spacerEl,
        start: "top center",
        once: true,
      },
    });

    heroTl.to(".nav_links", { opacity: 1 });

    heroTl.to(logoEl, {
      y: 0,
      scale: 1,
      ease: "power4.inOut",
      duration: 1,
    });

    heroTl.fromTo(
      videoEl,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
      }
    );
    
    heroTl.to(".hero.char", {
      y: 0,
      duration: 1.5,
      stagger: { amount: 0.5 },
      ease: "power2.inOut",
    },"<");



    gsap.to(".word.about", {
      scrollTrigger: {
        trigger: aboutEl,
        start: "top 75%",
        end: "top top",
        once: true,
      },
      opacity: 1,
      stagger: { amount: 0.5, from: "random" },
      duration: 1.5,
      ease: "power2.inOut",
    });

    gsap.to(".word.contact", {
      scrollTrigger: {
        trigger: contactEl,
        start: "top 75%",
        end: "top top",
        once: true,
      },
      opacity: 1,
      stagger: { amount: 0.5, from: "random" },
      duration: 1.5,
      ease: "power2.inOut",
    });

    gsap.to(".services.char", {
      scrollTrigger: {
        trigger: serviceEl,
        start: "top 99%",
        end: "bottom top",
        once: true,
      },
      y: 0,
      duration: 1.5,
      stagger: { amount: 0.5 },
      ease: "power2.inOut",
    });

    gsap.to(".service", {
      scrollTrigger: {
        trigger: serviceEl,
        start: "top 25%",
        end: "bottom top",
        once: true,
      },
      opacity: 1,
      duration: 1,
      stagger: { amount: 0.5 },
      ease: "power4.inOut",
    });

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);




  return (
    <>
      {/* <motion.div ref={backdrop} className="min-h-screen w-full z-50 fixed top-0">

      </motion.div> */}
      <nav className="w-full z-50 top-0 flex items-center fixed">
        <div className="w-11/12 mx-auto flex justify-between items-center min-h-20">
          <div className="hidden nav_links md:flex justify-between gap-4">

            <motion.span initial="initial" whileHover="hovered"><Link href='/' className='nav_links overflow-hidden relative flex'>
              <motion.span variants={{ initial: { y: 0 }, hovered: { y: 30 }, transition: { ease: 'easeInOut', duration: 1.5 } }} className='inline-block'>HOME</motion.span>
              <motion.span variants={{ initial: { y: -30 }, hovered: { y: 0 }, transition: { ease: 'easeInOut', duration: 1.5 } }} className='inline-block absolute'>HOME</motion.span>
            </Link></motion.span>
            <motion.span initial="initial" whileHover="hovered"><Link href='/' className='nav_links overflow-hidden relative flex'>
              <motion.span variants={{ initial: { y: 0 }, hovered: { y: 30 }, transition: { ease: 'easeInOut', duration: 1.5 } }} className='inline-block'>ABOUT</motion.span>
              <motion.span variants={{ initial: { y: -30 }, hovered: { y: 0 }, transition: { ease: 'easeInOut', duration: 1.5 } }} className='inline-block absolute'>ABOUT</motion.span>
            </Link></motion.span>
            <motion.span initial="initial" whileHover="hovered"><Link href='/' className='nav_links overflow-hidden relative flex'>
              <motion.span variants={{ initial: { y: 0 }, hovered: { y: 30 }, transition: { ease: 'easeInOut', duration: 1.5 } }} className='inline-block'>WORKS</motion.span>
              <motion.span variants={{ initial: { y: -30 }, hovered: { y: 0 }, transition: { ease: 'easeInOut', duration: 1.5 } }} className='inline-block absolute'>WORKS</motion.span>
            </Link></motion.span>
          </div>
          <div className="logo-wrapper w-[160px] h-auto flex-shrink-0 absolute left-1/2 -translate-x-1/2 md:relative md:left-auto md:translate-x-0">
            <Image
              className="opacity-0"
              ref={logo}
              priority
              quality={90}
              src={Logo}
              alt="Logo"
            />
          </div>
          <motion.span initial="initial" whileHover="hovered" className="hidden md:inline-block font-canela nav_links cta pointer-events-auto relative w-max px-4 py-2  text-[#C0892B] rounded-2xl overflow-hidden group border-2 border-transparent">
            <Link className=" relative inline-block" href=" ">

              <motion.span variants={{ initial: { y: 0 }, hovered: { y: 30 }, transition: { ease: 'easeInOut', duration: 1.5 } }} className='inline-block'>GET IN TOUCH</motion.span>
              <motion.span variants={{ initial: { y: -30 }, hovered: { y: 0 }, transition: { ease: 'easeInOut', duration: 1.5 } }} className='inline-block absolute left-0 top-0'>GET IN TOUCH</motion.span>

            </Link>
            <span className="absolute inset-0 glowing-border rounded-lg pointer-events-none"></span>
          </motion.span>
          <span className="inline-block md:hidden self-center -mt-4  justify-self-end nav_links">
            <Link href="">
              Menu
            </Link>
          </span>

        </div>
      </nav>
      <div className="min-h-screen w-full">
        <section ref={heroSpacer} className="relative  hero_section min-h-svh md:min-h-screen w-full">
          <div className=" w-11/12 mx-auto pb-4 min-h-svh md:min-h-screen flex items-end justify-items-center min-h-screen">
            <h1 className="flex flex-col leading-tight text-[1.8rem] md:text-2xl">
              <span className="inline-block overflow-hidden">
                {"DESIGN WITH FEELING,".split("").map((char, i) => (
                  <motion.span initial={{ y: 100 }} key={i} className="char hero inline-block">
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </span>
              <span className="inline-block overflow-hidden">
                {"STRATEGY WITH TASTE".split("").map((char, i) => (
                  <motion.span initial={{ y: 100 }} key={i + 100} className="char hero inline-block">
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </span>
            </h1>
            <video ref={bgVideo} className="opacity-0 absolute top-0 left-0 w-full h-full object-cover z-[-1]" autoPlay loop muted playsInline src="/video/hero_bg.mp4"></video>
          </div>

        </section>
        {/* <div ref={heroSpacer} className="min-h-screen w-full">

        </div> */}
      </div>

      <section ref={about} className="about_section min-h-[50vh] md:min-h-[50vh] lg:min-h-screen w-full">
        <div className="min-h-[50vh] md:min-h-[50vh] lg:min-h-screen w-11/12 mx-auto flex flex-col md:grid grid-cols-12 md:mt-16 lg:items-center gap-8 mt-12  md:justify-center">
          <div className="col-start-1 col-end-13 w-full md:grid grid-cols-12">
            <span className="text-primary col-start-1 col-end-3">(ABOUT US)</span>
            <h2 className="max-w-[30ch] md:col-start-3 lg:col-start-6 col-end-13 text-left leading-tight text-lg md:text-xl lg:text-2xl">
              {SplitAndUnderline("WE ARE OYATO A CREATIVE STORYTELLING AND MARKETING AGENCY", "OYATO", "about")}
            </h2>
          </div>
          <div className="col-start-1 row-start-2 gap-4 flex flex-col md:col-end-8 lg:col-end-5">
            <p className="text-secondary text-base text-inter">
              Oyato is a creative storytelling and marketing agency that exists to make brands feel unforgettable. We believe people connect with feeling, not just features, so we craft experiences that move audiences through narrative, design, and strategy.
            </p>

            <motion.span initial="initial" whileHover="hovered" className="font-canela pointer-events-auto relative w-max px-4 py-2 bg-[#0f0f0f] text-[#C0892B] rounded-2xl overflow-hidden group border-2 border-transparent">
              <Link className=" relative inline-block" href=" ">

                <motion.span variants={{ initial: { y: 0 }, hovered: { y: 30 }, transition: { ease: 'easeInOut', duration: 1.5 } }} className='inline-block'>LEARN MORE</motion.span>
                <motion.span variants={{ initial: { y: -30 }, hovered: { y: 0 }, transition: { ease: 'easeInOut', duration: 1.5 } }} className='inline-block absolute left-0 top-0'>LEARN MORE</motion.span>

              </Link>
              <span className="absolute inset-0 glowing-border rounded-lg pointer-events-none"></span>
            </motion.span>

          </div>

        </div>
      </section>

      <Works />
      <section ref={services} className="relative service_section min-h-screen w-full">
        <div className="text-secondary pt-40 flex gap-32 flex-col w-11/12 min-h-screen mx-auto">
          <div className="flex flex-col gap-12 justify-center items-center ">
            <h2 className="text-xl md:text-4xl ">{SplitText("OUR SERVICES", "services")}</h2>
            <p className="max-w-[60ch] text-center">At OYATO, we believe in telling your brand&apos;s story with, honesty, accuracy and impact. These are our services that allow us to do so.</p>
          </div>
          <div className="lg:grid gap-12 md:gap-16 lg:gap-y-24 flex flex-col lg:grid-cols-2">
            <div className="flex justify-between service gap-8 flex-col md:flex-row">
              <div className="flex gap-8 justify-between">
                <span className="text-sm font-canela tracking-tighter order-2">(01)</span>
                <span className="text-smd text-left font-canela tracking-tighter max-w-[10ch] order-1 md:order-2">BRAND STRATEGY</span>
              </div>

              <span className=" font-inter tracking-tight max-w-[40ch] leading-reg">Shape how the world sees you. We craft bold, intentional brand foundations that define your voice.</span>
            </div>
            <div className="flex justify-between service gap-8 flex-col md:flex-row">
              <div className="flex gap-8 justify-between">
                <span className="text-sm font-canela tracking-tighter order-2 md:order-1">(02)</span>
                <span className="text-smd font-canela tracking-tighter max-w-[10ch] order-1 md:order-2">VISUAL PRODUCTION</span>
              </div>

              <span className=" font-inter tracking-tight max-w-[40ch]  leading-reg">We create scroll-stopping visuals that speak your brand fluently. Whether it’s product, editorial, or brand storytelling.</span>
            </div>
            <div className="flex row-start-2 service justify-between gap-8 flex-col md:flex-row">
              <div className="flex gap-8 justify-between">
                <span className="text-sm font-canela tracking-tighter order-2 md:order-1">(03)</span>
                <span className="text-smd font-canela tracking-tighter max-w-[10ch]  order-1 md:order-2">CAMPAIGN PRODUCTION</span>
              </div>

              <span className=" font-inter tracking-tight max-w-[40ch]  leading-reg">We design and produce campaigns that move. We handle the details; creative, casting, locations and assets.</span>
            </div>
            <div className="flex row-start-2 service justify-between gap-8 flex-col md:flex-row">
              <div className="flex gap-8 justify-between">
                <span className="text-sm font-canela tracking-tighter order-2 md:order-1">(04)</span>
                <span className="text-smd font-canela tracking-tighter max-w-[10ch]  order-1 md:order-2">CREATIVE DIRECTION</span>
              </div>

              <span className=" font-inter tracking-tight max-w-[40ch]  leading-reg">Bring ideas to life with clarity and taste. We lead the visual language, tone, and feel of your brand so everything hits with purpose.</span>
            </div>
          </div>

        </div>
        <Image alt="" fill className="-z-10 absolute top-0 left-0" src={Bg} quality={75} sizes="100vw" />
      </section>
      <Clients />
      <section ref={contact} className="contact_section w-full min-h-[50vh] lg:min-h-screen">
        <div className="w-11/12 min-h-[50vh] lg:min-h-screen mx-auto flex-col flex gap-16 justify-center items-center">
          <h2 className="max-w-[17ch] text-secondary text-center leading-tight text-lg md:text-xl lg:text-4xl">
            {SplitAndUnderline("Lets Creates Something Beautiful Together", "none", "contact")}
          </h2>
          <div className="flex justify-between gap-48 w-11/12 md:w-[40vw] flex-row">
            <div className="col_1 text-primary underline">
              <Link href="/"><span>EMAIL</span></Link>
            </div>
            <div className="col_2 text-primary flex flex-col  underline">
              <Link href="/"><span>LINKEDIN</span></Link>
              <Link href="/"><span>INSTAGRAM</span></Link>
            </div>
          </div>
        </div>
      </section>
      <footer className="min-h-max w-full">
        <div className="py-2 min-h-max mx-auto flex flex-row text-xs text-secondary justify-between w-11/12">
          <span className="hidden md:inline-block">E  OYATOYEMI@GMAIL.COM</span>
          <span>© 2025 OYATO. All rights reserved. All projects depicted on this website, unless otherwise stated, are intellectual property of OYATO</span>
        </div>
      </footer>
    </>
  );
}


