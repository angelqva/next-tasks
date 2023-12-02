"use client";
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, UserCircleIcon, IdentificationIcon } from "@heroicons/react/24/outline";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { registerStore } from "@/hooks/registerStore";
import { useEffect, useRef } from "react";
import { SweetAlert } from "@/common/swal";

export default function RegisterForm() {
    const{
        isLoading,
        first_name,
        last_name,
        email,
        password,
        re_password,
        error,
        isPasswordVisible,
        isRePasswordVisible,
        setEmail,
        setPassword,
        setRePassword,
        setFirstName,
        setLastName,
        togglePasswordVisible,
        toggleRePasswordVisible,
        submit,
        setError,
        isRegister
    } = registerStore()
    const registerForm = useRef<HTMLFormElement| null>(null)
    useEffect(()=>{
        if(!isLoading && isRegister){
            SweetAlert.fire({
                title: "Thanks for Register",
                html: `
                    <p>Please check activation email at <b>${email}}</b></p>
                    <p>Is required to activate your account</p>
                `,
                icon: "success",
            }).then(()=>{
                const form = registerForm.current;
                if(form instanceof HTMLFormElement){
                    form.reset()
                }
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isLoading, registerForm.current])

    useEffect(()=>{
        if(error.other){
            SweetAlert.fire({
                title: "Something Wrong",
                html: `
                    <p>${error.other}</p>
                `,
                icon: "error",
            }).then(()=>{
                setError({...error, other:""})
            })
        }
    }, [error.other, error, setError])
	return (
		<form className="mt-5 justify-center max-w-[300px] flex flex-col gap-4 w-full min-w-sm" onSubmit={submit} noValidate ref={registerForm}>
			<Input
				label="First Name"
				variant="bordered"
				placeholder="Enter your first name"
				value={first_name}
				onValueChange={(value)=>setFirstName(value)}
				endContent={<span className="inline-flex align-middle w-[2rem] h-[2rem] text-default-400 pointer-events-none flex-shrink-0"><UserCircleIcon /></span>}
				type="text"
				className="w-[300px]"
                isInvalid={error.first_name.length > 0}
                color={error.first_name.length > 0 ? "danger" : "default"}
                errorMessage={error.first_name.length > 0 && error.first_name}
			/>
            <Input
				label="Last Name"
				variant="bordered"
				placeholder="Enter your last name"
				value={last_name}
				onValueChange={(value)=>setLastName(value)}
				endContent={<span className="inline-flex align-middle w-[2rem] h-[2rem] text-default-400 pointer-events-none flex-shrink-0"><UserCircleIcon /></span>}
				type="text"
				className="w-[300px]"
                isInvalid={error.last_name.length > 0}
                color={error.last_name.length > 0 ? "danger" : "default"}
                errorMessage={error.last_name.length > 0 && error.last_name}
			/>
            <Input
				label="Email"
				variant="bordered"
				placeholder="Enter your@email.com"
				value={email}
				onValueChange={(value)=>setEmail(value)}
				endContent={<span className="inline-flex align-middle w-[2rem] h-[2rem] text-default-400 pointer-events-none flex-shrink-0"><EnvelopeIcon /></span>}
				type="email"
				className="w-[300px]"
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
				onValueChange={(value)=> setPassword(value)}
				endContent={
					<button className="focus:outline-none flex align-middle" type="button" onClick={togglePasswordVisible}>
						{isPasswordVisible ? (
                            <span className="inline-flex w-[2rem] h-[2rem] text-default-400 pointer-events-none"><EyeSlashIcon title="Hide Password"/></span>
							
						) : (
                            <span className="inline-flex w-[2rem] h-[2rem] text-default-400 pointer-events-none"><EyeIcon title="Show Password"/></span>							
						)}
					</button>
				}
				type={isPasswordVisible ? "text" : "password"}
				className="w-[300px]"
                isInvalid={error.password.length > 0}
                color={error.password.length > 0 ? "danger" : "default"}
                errorMessage={error.password.length > 0 && error.password}
			/>
            <Input
				label="Confirm Password"
				variant="bordered"
				placeholder="ReType Password"
                autoComplete="confirm_password"
				value={re_password}
				onValueChange={(value)=> setRePassword(value)}
				endContent={
					<button className="focus:outline-none flex align-middle" type="button" onClick={toggleRePasswordVisible}>
						{isRePasswordVisible ? (
                            <span className="inline-flex w-[2rem] h-[2rem] text-default-400 pointer-events-none"><EyeSlashIcon title="Hide Password"/></span>
							
						) : (
                            <span className="inline-flex w-[2rem] h-[2rem] text-default-400 pointer-events-none"><EyeIcon title="Show Password"/></span>							
						)}
					</button>
				}
				type={isRePasswordVisible ? "text" : "password"}
				className="w-[300px]"
                isInvalid={error.re_password.length > 0}
                color={error.re_password.length > 0 ? "danger" : "default"}
                errorMessage={error.re_password.length > 0 && error.re_password}
			/>
            <Button color="primary" type="submit" size="lg"
                isLoading={isLoading} className="font-bold"
                startContent={<span className={`align-middle w-[2rem] h-[2rem] pointer-events-none flex-shrink-0 ${isLoading ? 'hidden':'inline-flex'}`}><IdentificationIcon /></span>}>
                Complete Registration
            </Button>
		</form>
	);
}
