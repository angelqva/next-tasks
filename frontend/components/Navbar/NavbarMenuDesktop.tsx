"use client";
import { NavbarItem } from "@nextui-org/navbar";
import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { authStore } from "@/hooks/authStore";

export default function NavbarMenuDesktop() {
	const pathName = usePathname();
	const { isAuthenticated } = authStore();
	return (
		<>
			<ul className="hidden lg:flex gap-4 justify-start ml-2">
				{siteConfig.navItems.map((item) => {
					const isItemShow = () => {
						if (item.condition && item.condition === "isAuthenticated") {
							return isAuthenticated;
						}
						if (item.condition && item.condition === "unAuthenticated") {
							return !isAuthenticated;
						}
						return true;
					};
					return (
						
                            <NavbarItem key={`desktop-${item.label}`}
                                className={
                                    clsx({
                                        "hidden": !isItemShow()
                                    })
                                }
                            >
                                <NextLink
                                    className={clsx({
                                        "relative inline-flex items-center tap-highlight-transparent outline-none font-bold": true,
                                        "text-primary": pathName === item.href,
                                        "text-foreground": pathName !== item.href,
                                    })}
                                    href={item.href}
                                >
                                    {item.label}
                                </NextLink>
                            </NavbarItem>                     
					);
				})}
			</ul>
		</>
	);
}
