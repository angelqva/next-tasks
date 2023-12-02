import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { GithubIcon } from "@/components/Icons";
import HomeActions from "@/components/Pages/Home/HomeActions";

export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<h1 className="h-title">
				Manage Tasks <span className="text-linear-purple">Effectively: &nbsp;</span>
			</h1>
            <h2 className="h-description">
                Create, delete, and complete tasks with ease on our site.
            </h2>
			<p className="h-description mt-8"><span className="text-linear-purple">Take control</span> of your productivity today!</p>
			<HomeActions />
			<div className="mt-8">
				<Snippet hideSymbol hideCopyButton variant="flat">
					<span className="flex items-center font-bold">
						Check code at&nbsp;
						<Link className={`${buttonStyles({ color: "primary", radius: "lg", variant: "flat" })}`} href={siteConfig.links.github}>
                            <GithubIcon size={20} />
                            <span style={{ fontWeight: "bolder" }}>Github Repository</span>
						</Link>
					</span>
				</Snippet>
			</div>
		</section>
	);
}
