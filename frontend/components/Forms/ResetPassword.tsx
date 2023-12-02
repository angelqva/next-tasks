"use client";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { resetPasswordStore } from "@/hooks/resetPasswordStore";
import { useEffect } from "react";
import { SweetAlert } from "@/common/swal";

export default function ResetPasswordForm() {
    
	const {
        isEmailSend,
        isLoading,        
        email,        
        error,
        setEmail,
        setError,
        reset,
        submit
    } = resetPasswordStore();
    useEffect(()=>{
        if(error.other.length > 0){
            SweetAlert.fire({
                title: "Something Wrong",
                html: `<p>${error.other}</p>`,
                icon:"error"
            }).then(()=>{
                setError({...error, other:""})
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[error.other, setError])
    useEffect(()=>{
        if(isEmailSend){
            SweetAlert.fire({
                title:"Confirm Password Reset Send",
                html:`                    
                    <p>Cehck your email for confirm password reset</p>
                    <p>Note: Only send emails for user accounts</p>
                `,
                icon: "info"
            }).then(()=>{
                reset()
            })
        }
    },[isEmailSend, reset])
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
            <Button color="primary" type="submit" size="lg"
                isLoading={isLoading} className="font-bold"
                startContent={<span className={`align-middle w-[2rem] h-[2rem] pointer-events-none flex-shrink-0 ${isLoading ? 'hidden':'inline-flex'}`}><EnvelopeIcon /></span>}>
                Send Email
            </Button>
		</form>
	);
}
