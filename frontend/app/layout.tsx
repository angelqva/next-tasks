import "@/styles/globals.scss";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Navbar } from "@/components/Navbar";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import CheckAuth from "@/components/Helpers/CheckAuth";

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	icons: {
		icon: "/favicon.ico",
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body className={clsx("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
				<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
					<>
						{/* <CheckAuth /> */}
						<div className="relative flex flex-col h-screen w-full overflow-y-auto overflow-x-hidden">
                            <Navbar />
                            <div className="absolute -top-20 w-full h-full z-0 opacity-0 overflow-hidden data-[mounted=true]:opacity-100 transition-opacity bg-left bg-no-repeat bg-[url('/svg/looper-pattern.svg')] after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-gradient-to-r after:from-transparent after:to-background dark:after:to-black after:z-[-1]" data-mounted="true"></div>
							
							<main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow relative">                                
                                {children}
                            </main>
							<footer className="w-full flex items-center justify-center py-3">
								<Link									
									className="flex items-center gap-1 text-current font-bold"
									href="mailto:angel.napolesqva@gmail.com"
									title="nextui.org homepage"
								>
									<span className="text-default-600">Made with <span className="text-danger text-lg">&hearts;</span> by</span>
									<span className="text-primary">angel.napolesqva@gmail.com</span>                                    
								</Link>
							</footer>
						</div>
					</>
				</Providers>
			</body>
		</html>
	);
}
