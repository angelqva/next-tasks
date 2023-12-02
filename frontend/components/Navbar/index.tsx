"use client"
import { Navbar as NextUINavbar, NavbarContent, NavbarMenuToggle, NavbarBrand, NavbarItem } from "@nextui-org/navbar";
import NavbarUser from "./NavbarUser";
import { Link } from "@nextui-org/link";
import { siteConfig } from "@/config/site";
import NextLink from "next/link";

import { ThemeSwitch } from "@/components/ThemeSwitch";
import {GithubIcon} from "@/components/Icons";
import { Logo } from "@/components/Icons";
import NavbarMenuDesktop from "./NavbarMenuDesktop";
import NavbarMenuMobile from "./NavBarMenuMobile";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import NavToogler from "./NavToogler";

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const pathName = usePathname()
    useEffect(()=>{
        setIsMenuOpen(false)
    },[pathName])
	return (
		<NextUINavbar maxWidth="xl" position="sticky" 
            isMenuOpen={isMenuOpen}
            >
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start" key="nav-brand">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href="/">
						<Logo />
						<p className="font-bold text-inherit">Next-Tasks</p>
					</NextLink>
				</NavbarBrand>
				<NavbarMenuDesktop />
			</NavbarContent>

			<NavbarContent className="flex basis-1 sm:basis-full" justify="end" key="nav-actions">
				<NavbarItem className="flex gap-2">					
					<Link isExternal href={siteConfig.links.github} aria-label="Github">
						<GithubIcon className="text-default-500" />
					</Link>
					<ThemeSwitch />

				</NavbarItem>				
                <NavbarUser />
                <NavToogler className="lg:hidden" open={isMenuOpen} setOpen={()=>setIsMenuOpen(!isMenuOpen)} />
			</NavbarContent>
			<NavbarMenuMobile />
		</NextUINavbar>
	);
};
