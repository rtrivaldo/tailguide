"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

import { IoSunnyOutline } from "react-icons/io5";
import { RxMoon } from "react-icons/rx";
import { FaGithub } from "react-icons/fa";

export default function Navbar() {
    const pathname = usePathname();
    const { setTheme } = useTheme();

    return (
        <div className="fixed inset-x-0 flex justify-between items-center xl:container mx-auto px-4 md:px-6 py-6 bg-slate-50 dark:bg-slate-950">
            <div className="flex items-center gap-10">
                {/* logo */}
                <Link href={"/"} className="text-xl font-semibold">
                    Logo
                </Link>

                {/* nav links */}
                <div className="hidden md:flex items-center gap-6 text-slate-500">
                    <Link href="/" className={`hover:text-slate-950 dark:hover:text-slate-100 transition-colors ${pathname === "/" ? "text-slate-950 dark:text-slate-100" : ""}`}>
                        Palletes
                    </Link>
                    <Link href="/gradient" className={`hover:text-slate-950 dark:hover:text-slate-100 transition-colors ${pathname === "/gradient" ? "text-slate-950 dark:text-slate-100" : ""}`}>
                        Gradients
                    </Link>
                    <Link href="/grid" className={`hover:text-slate-950 dark:hover:text-slate-100 transition-colors ${pathname === "/grid" ? "text-slate-950 dark:text-slate-100" : ""}`}>
                        Grids
                    </Link>
                    <Link href="/shadow" className={`hover:text-slate-950 dark:hover:text-slate-100 transition-colors ${pathname === "/shadow" ? "text-slate-950 dark:text-slate-100" : ""}`}>
                        Shadows
                    </Link>
                </div>
            </div>

            <div className="flex items-center text-xl">
                {/* github repo */}
                <Link href={""} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-all duration-300 ease-out">
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
    );
}
