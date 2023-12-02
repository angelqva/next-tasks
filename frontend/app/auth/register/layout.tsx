export default function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 font-bold">
			{children}
		</section>
	);
}
