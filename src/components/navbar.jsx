"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

import { useState } from "react";

import { IoSunnyOutline } from "react-icons/io5";
import { RxMoon } from "react-icons/rx";
import { FaGithub } from "react-icons/fa";
import { ImCross } from "react-icons/im";

export default function Navbar() {
    const pathname = usePathname();
    const { setTheme } = useTheme();

    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className={`absolute inset-y-0 w-full px-4 md:px-6 py-8 bg-slate-50 dark:bg-zinc-900 md:hidden z-20 transition-all duration-300 ease-out ${isOpen ? "left-0" : "-left-[100%]"}`}>
                <div className="flex justify-end" onClick={handleToggle}>
                    <ImCross />
                </div>

                <div className="flex flex-col gap-2 font-semibold text-xl mt-20 pl-6 text-zinc-500">
                    <Link href={"/"} className={`${pathname === "/" ? "text-slate-950 dark:text-slate-100" : ""}`} onClick={handleToggle}>
                        Transform
                    </Link>
                    <Link href={"/border-radius"} className={`${pathname === "/border-radius" ? "text-slate-950 dark:text-slate-100" : ""}`} onClick={handleToggle}>
                        Border Radius
                    </Link>
                    <Link href={"/shadow"} className={`${pathname === "/shadow" ? "text-slate-950 dark:text-slate-100" : ""}`} onClick={handleToggle}>
                        Box Shadow
                    </Link>
                </div>
            </div>
            <div className="fixed inset-x-0 flex justify-between items-center xl:container mx-auto px-4 md:px-6 py-6 bg-slate-50 dark:bg-zinc-900 transition-colors duration-300 ease-out">
                <div className="flex items-center gap-10">
                    {/* logo */}
                    <Link href={"/"} className="text-xl font-semibold hidden md:block">
                        TailGuide
                    </Link>

                    {/* hamburger */}
                    <div className="flex flex-col gap-1 md:hidden" onClick={handleToggle}>
                        <span className="w-5 h-[2px] bg-zinc-900 dark:bg-slate-50"></span>
                        <span className="w-5 h-[2px] bg-zinc-900 dark:bg-slate-50"></span>
                        <span className="w-5 h-[2px] bg-zinc-900 dark:bg-slate-50"></span>
                    </div>

                    {/* nav links */}
                    <div className="hidden md:flex items-center gap-6 text-zinc-500">
                        <Link href="/" className={`hover:text-slate-950 dark:hover:text-slate-100 transition-colors ${pathname === "/" ? "text-slate-950 dark:text-slate-100" : ""}`}>
                            Transform
                        </Link>
                        <Link href="/border-radius" className={`hover:text-slate-950 dark:hover:text-slate-100 transition-colors ${pathname === "/border-radius" ? "text-slate-950 dark:text-slate-100" : ""}`}>
                            Border Radius
                        </Link>
                        <Link href="/shadow" className={`hover:text-slate-950 dark:hover:text-slate-100 transition-colors ${pathname === "/shadow" ? "text-slate-950 dark:text-slate-100" : ""}`}>
                            Shadows
                        </Link>
                    </div>
                </div>

                <div className="flex items-center text-xl">
                    {/* github repo */}
                    <Link href={"https://github.com/rtrivaldo/tailguide"} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-all duration-300 ease-out">
                        <FaGithub />
                    </Link>

                    {/* dark mode toggle */}
                    <div className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md cursor-pointer dark:hidden group transition-all duration-300 ease-out" onClick={() => setTheme("dark")}>
                        <IoSunnyOutline className="group-hover:rotate-90 transition-transform duration-300 ease-out" />
                    </div>
                    <div className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md cursor-pointer hidden dark:block group transition-all duration-300 ease-out" onClick={() => setTheme("light")}>
                        <RxMoon className="group-hover:rotate-12 transition-transform duration-300 ease-out" />
                    </div>
                </div>
            </div>
        </>
    );
}
