import RequireAuth from "@/components/Helpers/RequireAuth";
export default function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="flex flex-col items-center justify-center gap-10 py-8 font-bold">
            <RequireAuth>{children}</RequireAuth>			
		</section>
	);
}