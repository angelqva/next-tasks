export type ISiteConfig = {
    name: string;
    description: string;
    navItems:{
        label: string;
        href: string;
        condition?: "isAuthenticated" | "unAuthenticated";
    }[];
    links: {[key:string] : string };
}

export const siteConfig:ISiteConfig = {
	name: "Next.js + NextUI",
	description: "Make beautiful websites regardless of your design experience.",
	navItems: [
		{
			label: "Home",
			href: "/",
		},
        {
			label: "Tasks",
			href: "/tasks",
            condition: "isAuthenticated"
		},		
		{
			label: "Register",
			href: "/auth/register",
            condition: "unAuthenticated"
		},
        {
			label: "Authenticate",
			href: "/auth/login",
            condition: "unAuthenticated"
		},
	],	
	links: {
		github: "https://github.com/angelqva",
	},
};
