"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // ===== INTRO ANIMATION =====
            gsap.from(".letter", {
                opacity: 0,
                y: 80,
                stagger: 0.05,
                duration: 1,
                ease: "power4.out",
            });

            gsap.from(".stat", {
                opacity: 0,
                y: 50,
                stagger: 0.2,
                delay: 0.6,
                duration: 1,
                ease: "power3.out",
            });

            // ===== SCROLL PIN ANIMATION =====
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "+=200%",
                    scrub: 1,
                    pin: true,
                    pinSpacing: false,
                },
            });

            tl.to(
                ".car-image",
                {
                    y: -400,
                    scale: 1.2,
                    rotate: -3,
                    ease: "none",
                },
                0
            );

            tl.to(
                ".headline",
                {
                    y: -150,
                    opacity: 0,
                    ease: "none",
                },
                0
            );

            tl.to(
                ".stat",
                {
                    y: -100,
                    opacity: 0,
                    stagger: 0.1,
                    ease: "none",
                },
                0
            );
        }, heroRef);

        return () => ctx.revert();
    }, []);

    const text = "WELCOME   ITZFIZZ".split("   ");

    return (
        <section
            ref={heroRef}
            className="h-screen flex flex-col justify-center items-center bg-black text-white relative overflow-hidden"
        >
            {/* HEADLINE */}
            <h1 className="headline text-4xl md:text-6xl font-bold tracking-[0.5em] text-center z-20 relative">
                {text.map((char, index) => (
                    <span key={index} className="letter inline-block">
                        {char}
                    </span>
                ))}
            </h1>

            {/* STATS */}
            <div className="flex flex-col md:flex-row gap-10 mt-12 z-20 relative text-center">
                <div className="stat">
                    <h2 className="text-3xl font-semibold">95%</h2>
                    <p className="text-sm">Client Satisfaction</p>
                </div>

                <div className="stat">
                    <h2 className="text-3xl font-semibold">120+</h2>
                    <p className="text-sm ">Projects Delivered</p>
                </div>

                <div className="stat">
                    <h2 className="text-3xl font-semibold">5X</h2>
                    <p className="text-sm ">Growth Rate</p>
                </div>
            </div>

            {/* CAR IMAGE */}
            <img
                src="/car.webp"
                alt="Car"
                className="car-image absolute bottom-0 w-[450px] md:w-[650px] z-10 will-change-transform pointer-events-none"
            />
        </section>
    );
}