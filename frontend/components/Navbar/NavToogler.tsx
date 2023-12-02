import clsx from "clsx";

export default function NavToogler({ open, setOpen, className }: { open: boolean; setOpen: () => void; className?: string }) {
	return (
		<div
			className={`${clsx({
                customClass: true,
                "nav-toggle cursor-pointer size-md": true,
                active: open,
            })} ${className ?? ""}`}
			onClick={() => {
				setOpen();
			}}
		>
			<span className="line-toggle"></span>
			<span className="line-toggle"></span>
			<span className="line-toggle"></span>
		</div>
	);
}
