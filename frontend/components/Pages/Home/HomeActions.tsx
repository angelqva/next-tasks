"use client";
import Link from "next/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { UserPlusIcon, ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import { authStore } from "@/hooks/authStore";
export default function HomeActions() {
	const { isAuthenticated } = authStore();
	return (
		<>
			<div className="flex gap-3 mt-8">
				{isAuthenticated ? (
					<>
						<Link href="/tasks" className={`text-lg ${buttonStyles({ size:"lg", color: "primary", radius: "full", variant: "shadow" })}`}>
							<span className="font-bold">Start Manage Your Tasks Now!</span>
						</Link>
					</>
				) : (
					<>
						<Link href="/auth/register" className={`text-lg ${buttonStyles({ size:"lg", color: "secondary", radius: "full", variant: "shadow" })}`}>
							<span className={`align-middle w-[1.5rem] h-[1.5rem] flex-shrink-0 `}>
								<UserPlusIcon />
							</span>
							<span className="font-bold pr-4">Sign Up Now!</span>
						</Link>
						<Link className={`text-lg ${buttonStyles({ size:"lg", color: "secondary", variant: "ghost", radius: "full" })}`} href="/auth/login">
							<span className={`align-middle w-[1.5rem] h-[1.5rem] flex-shrink-0 `}>
								<ArrowLeftOnRectangleIcon />
							</span>
							<span className="font-bold pr-4">Authenticate</span>
						</Link>
					</>
				)}
			</div>
		</>
	);
}
