"use client";

import { cn } from "@/lib/utils";
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface TextRepelProps {
    text: string;
    className?: string;
    letterClassName?: string;
    radius?: number;
    strength?: number;
    mode?: "repel" | "attract";
    stiffness?: number;
    damping?: number;
    mass?: number;
}

function RepelLetter({
    letter,
    mouseX,
    mouseY,
    radius,
    strength,
    mode,
    stiffness,
    damping,
    mass,
    className,
}: {
    letter: string;
    mouseX: MotionValue<number>;
    mouseY: MotionValue<number>;
    radius: number;
    strength: number;
    mode: "repel" | "attract";
    stiffness: number;
    damping: number;
    mass: number;
    className?: string;
}) {
    const ref = useRef<HTMLSpanElement>(null);
    const originX = useRef(0);
    const originY = useRef(0);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness, damping, mass });
    const springY = useSpring(y, { stiffness, damping, mass });

    const rotate = useTransform(springX, (v) => v * 0.3);

    useEffect(() => {
        const capture = () => {
            if (!ref.current) return;
            const container = ref.current.closest("[data-text-repel]");
            if (!container) return;
            const cr = container.getBoundingClientRect();
            const lr = ref.current.getBoundingClientRect();
            originX.current = lr.left - cr.left + lr.width / 2;
            originY.current = lr.top - cr.top + lr.height / 2;
        };

        const raf = requestAnimationFrame(capture);
        window.addEventListener("resize", capture);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", capture);
        };
    }, []);

    useEffect(() => {
        const update = () => {
            const mx = mouseX.get();
            const my = mouseY.get();
            const dx = originX.current - mx;
            const dy = originY.current - my;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < radius && distance > 0) {
                const force = ((1 - distance / radius) ** 2) * strength;
                const angle = Math.atan2(dy, dx);
                const dir = mode === "attract" ? -1 : 1;
                x.set(Math.cos(angle) * force * dir);
                y.set(Math.sin(angle) * force * dir);
            } else {
                x.set(0);
                y.set(0);
            }
        };

        const unsub1 = mouseX.on("change", update);
        const unsub2 = mouseY.on("change", update);
        return () => {
            unsub1();
            unsub2();
        };
    }, [mouseX, mouseY, radius, strength, mode, x, y]);

    if (letter === " ") {
        return <span className="inline-block whitespace-pre"> </span>;
    }

    return (
        <motion.span
            ref={ref}
            className={cn(
                "inline-block whitespace-pre will-change-transform",
                className
            )}
            style={{ x: springX, y: springY, rotate }}
            aria-hidden
        >
            {letter}
        </motion.span>
    );
}

function useIsTouch(breakpoint = 1024) {
    const [isTouch, setIsTouch] = useState(false);
    useEffect(() => {
        const check = () => setIsTouch(window.innerWidth < breakpoint);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, [breakpoint]);
    return isTouch;
}

export function TextRepel({
    text,
    className,
    letterClassName,
    radius = 120,
    strength = 45,
    mode = "repel",
    stiffness = 180,
    damping = 14,
    mass = 0.4,
}: TextRepelProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(-9999);
    const mouseY = useMotionValue(-9999);
    const isTouch = useIsTouch();

    if (isTouch) {
        return <>{text}</>;
    }

    return (
        <div
            ref={containerRef}
            data-text-repel
            className={cn(
                "inline-flex flex-wrap items-center justify-center cursor-default select-none",
                className
            )}
            onMouseMove={(e) => {
                const rect = containerRef.current?.getBoundingClientRect();
                if (!rect) return;
                mouseX.set(e.clientX - rect.left);
                mouseY.set(e.clientY - rect.top);
            }}
            onMouseLeave={() => {
                mouseX.set(-9999);
                mouseY.set(-9999);
            }}
            aria-label={text}
        >
            {text.split(" ").map((word, wi) => (
                <span key={wi} className="inline-flex whitespace-nowrap">
                    {word.split("").map((letter, li) => (
                        <RepelLetter
                            key={`${wi}-${li}`}
                            letter={letter}
                            mouseX={mouseX}
                            mouseY={mouseY}
                            radius={radius}
                            strength={strength}
                            mode={mode}
                            stiffness={stiffness}
                            damping={damping}
                            mass={mass}
                            className={letterClassName}
                        />
                    ))}
                    {wi < text.split(" ").length - 1 && (
                        <RepelLetter
                            key={`${wi}-space`}
                            letter=" "
                            mouseX={mouseX}
                            mouseY={mouseY}
                            radius={radius}
                            strength={strength}
                            mode={mode}
                            stiffness={stiffness}
                            damping={damping}
                            mass={mass}
                            className={letterClassName}
                        />
                    )}
                </span>
            ))}
        </div>
    );
}
