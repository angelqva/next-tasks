"use client";
import { authStore } from "@/hooks/authStore";
import { useEffect } from "react";

export default function CheckAuth() {
	const { getUser } = authStore();
	useEffect(() => {
		getUser();
	}, [getUser]);
	return <></>;
}
