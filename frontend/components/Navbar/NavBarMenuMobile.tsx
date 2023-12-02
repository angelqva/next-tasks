"use client";
import { NavbarMenuItem, NavbarMenu } from "@nextui-org/navbar";
import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { authStore } from "@/hooks/authStore";
export default function NavbarMenuMobile() {
	const pathName = usePathname();
	const { isAuthenticated } = authStore();
	return (
		<>
			<NavbarMenu key={"nav-menu-mobile"}>
				<div className="mx-4 mt-2 flex flex-col gap-2">
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
							<NavbarMenuItem
								key={`mobile-${item.label}`}
								className={clsx({
									"hidden": !isItemShow(),
								})}
							>
								<NextLink
									href={item.href}
									className={clsx({
										"text-lg font-bold": true,
										"text-foreground": pathName !== item.href,
										"text-primary": pathName === item.href,
									})}
								>
									{item.label}
								</NextLink>
							</NavbarMenuItem>
						);
					})}
				</div>
			</NavbarMenu>
		</>
	);
}
