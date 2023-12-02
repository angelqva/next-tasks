/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, FingerPrintIcon } from "@heroicons/react/24/outline";
import { Input } from "@nextui-org/input";
import { loginStore } from "@/hooks/loginStore";
import { Button } from "@nextui-org/button";
import { useEffect } from "react";
import { authStore } from "@/hooks/authStore";
import { useRouter } from "next/navigation";
import { SweetAlert } from "@/common/swal";
export default function LoginForm() {	
	const {
        isLoading,
        isPasswordVisible,
        email,
        password,
        error,
        setEmail,
        setPassword,
        togglePasswordVisible,
        submit,
        reset
    } = loginStore();
    const {isAuthenticated, user} = authStore();
    const router = useRouter();
    
    useEffect(()=>{
        if(isAuthenticated){
            SweetAlert.fire({
                title: "You already Authenticated",
                html: `<b>${user?.first_name}</b> You will be redirect to home`,
                icon: "success",
            }).then(()=>{
                router.push("/")
            })
        }
    },[])
    useEffect(()=>{
        if(isLoading && isAuthenticated){
            SweetAlert.fire({
                title: "Welcome",
                html: `<b>${user?.first_name}</b> You will be redirect to <b>Task Page</b>`,
                icon: "success"
            }).then(()=>{
                reset()
                router.push("/tasks")
            })
        }
    },[isAuthenticated])
	return (
		<form className="mt-5 justify-center max-w-[300px] flex flex-col gap-4 w-full min-w-sm" onSubmit={submit} noValidate>
			<Input
				label="Email"
				variant="bordered"
				placeholder="Enter your@email.com"
				value={email}
				onValueChange={(value)=>setEmail(value)}
				endContent={<span className="inline-flex align-middle w-[2rem] h-[2rem] text-default-400 pointer-events-none flex-shrink-0"><EnvelopeIcon /></span>}
				type="email"
				className="w-[300px] font-bold"
                isInvalid={error.email.length > 0}
                color={error.email.length > 0 ? "danger" : "default"}
                errorMessage={error.email.length > 0 && error.email}
			/>
			<Input
				label="Password"
				variant="bordered"
				placeholder="Enter your password"
                autoComplete="current_password"
				value={password}
				onValueChange={(value)=>setPassword(value)}
				endContent={
					<button className="focus:outline-none flex align-middle" type="button" onClick={()=>togglePasswordVisible()}>
						{isPasswordVisible ? (
                            <span className="inline-flex w-[2rem] h-[2rem] text-default-400 pointer-events-none"><EyeSlashIcon title="Hide Password"/></span>
							
						) : (
                            <span className="inline-flex w-[2rem] h-[2rem] text-default-400 pointer-events-none"><EyeIcon title="Show Password"/></span>							
						)}
					</button>
				}
				type={isPasswordVisible ? "text" : "password"}
				className="w-[300px] font-bold"
                isInvalid={error.password.length > 0}
                color={error.password.length > 0 ? "danger" : "default"}
                errorMessage={error.password.length > 0 && error.password}
			/>
            <Button color="primary" type="submit" size="lg"
                isLoading={isLoading} className="font-bold"
                startContent={<span className={`align-middle w-[2rem] h-[2rem] pointer-events-none flex-shrink-0 ${isLoading ? 'hidden':'inline-flex'}`}><FingerPrintIcon /></span>}>
                Send Credentials
            </Button>
		</form>
	);
}
