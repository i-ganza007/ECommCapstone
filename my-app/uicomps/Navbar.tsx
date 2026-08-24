"use client"
import Logo from "@/images/frontend_logo.png"
import { useState } from 'react';
import { Bell, UserRound } from "lucide-react"
import Image from "next/image"
import Link from 'next/link'
import { cn } from "@/lib/utils"


const LINKS = ["Dashboard", "Product List", "Variants", "Assets"]
const ACTIVE = "Dashboard"



const navItem = "cursor-pointer rounded-full px-6 py-2.5 transition-colors"

export default function Navbar() {
    const [activeLink,setActiveLink] = useState("")
    return (
        <nav className="flex w-full items-center justify-between py-2">
            <Image src={Logo} alt="Logo Image" width={38} height={38} />

            <ul className="hidden items-center gap-2 text-[15px] lg:flex">
                {LINKS.map((link) => (
                    <Link
                        key={link}
                        href={link == "Product List" ? `/productList` : link == "Dashboard" ? `/` : link == "Variants" ? `/variants` : `/assets`}
                        className={cn(
                            navItem,
                            link === activeLink
                                ? "bg-white/20 text-white"
                                : "text-white/70 hover:bg-white/10 hover:text-white",
                        )}
                        onClick={()=>setActiveLink(link)}
                    >
                        {link}
                    </Link>
                ))}
            </ul>

            <div className="flex items-center gap-2">
                <button
                    type="button"
                    aria-label="Notifications"
                    className="grid size-11 place-items-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
                >
                    <Bell className="size-5" />
                </button>
                <button
                    type="button"
                    aria-label="Account"
                    className="grid size-11 place-items-center rounded-full bg-zinc-900 text-white transition-colors hover:bg-zinc-800"
                >
                    <UserRound className="size-5" />
                </button>
            </div>
        </nav>
    )
}
