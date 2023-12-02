"use client";
import { apiFetch } from "@/common/axiosDjango";
import { SweetAlert } from "@/common/swal";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UidTokenParams() {
	const params = useParams();
	const router = useRouter();
	useEffect(() => {
		const uid = String(params.uid ?? "");
		const token = String(params.token ?? "");
		let activate = false;
		SweetAlert.fire({
			title: "Sending Account Activation",
			html: "Please wait not leave this page",
			didOpen: async () => {
				SweetAlert.showLoading();

				await new Promise<void>((resolve) => {
					const timeResolve = (time = 1000) => {
						setTimeout(() => {
							resolve();
						}, time);
					};
					apiFetch(false,"/users/activation/", "post", { uid, token } )						
						.then(() => {
							activate = true;
							timeResolve();
						})
						.catch(() => timeResolve());
				});
				SweetAlert.close();
			},
			allowOutsideClick: () => !SweetAlert.isLoading(),
		}).then(() => {
			if (activate) {
				SweetAlert.fire({
					title: "Activation Successfully",
					html: "<p>You will be redirect to Authentication</p>",
					icon: "success",
				}).then(() => {
					router.push("/auth/login");
				});
			} else {
				SweetAlert.fire({
					title: "Activation Failled",
					html: `
                                <p>Link invalid or expired contact Support Team</p>
                                <p>You will be redirect to Home</p>
                            `,
					icon: "error",
				}).then(() => {
					router.push("/");
				});
			}
		});
	}, [params, router]);
	return <></>;
}
