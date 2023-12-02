"use client";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import {FaFloppyDisk} from "react-icons/fa6";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { resetPasswordConfirmStore } from "@/hooks/resetPasswordConfirmStore";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { SweetAlert } from "@/common/swal";


export default function ResetPasswordConfirmForm() {
    const params = useParams();
    const router = useRouter();
    const{
        isResetConfirm,
        isLoading,        
        new_password,
        re_new_password,
        error,
        isNewPasswordVisible,
        isReNewPasswordVisible,        
        setNewPassword,
        setReNewPassword,        
        toggleNewPasswordVisible,
        toggleReNewPasswordVisible,
        setTokens,
        setError,
        reset,
        submit,
    } = resetPasswordConfirmStore()
    useEffect(()=>{
        setTokens({
            uid: String(params.uid ?? ""),
            token: String(params.token ?? "")
        })      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
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
    }, [error.other])
    useEffect(()=>{
        if(isResetConfirm){
            SweetAlert.fire({
                title:"Password Changed Successfully",
                html:`                    
                    <p>You will be redirect to Authentication</p>
                `,
                icon: "success"
            }).then(()=>{
                reset()
                router.push("/auth/login")
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isResetConfirm])
	return (
		<form className="mt-5 justify-center max-w-[300px] flex flex-col gap-4 w-full min-w-sm" onSubmit={submit} noValidate>			
			<Input
				label="New Password"
				variant="bordered"
				placeholder="Enter your new password"
                autoComplete="new_password"
				value={new_password}
				onValueChange={(value)=> setNewPassword(value)}
				endContent={
					<button className="focus:outline-none flex align-middle" type="button" onClick={toggleNewPasswordVisible}>
						{isNewPasswordVisible ? (
                            <span className="inline-flex w-[2rem] h-[2rem] text-default-400 pointer-events-none"><EyeSlashIcon title="Hide Password"/></span>
							
						) : (
                            <span className="inline-flex w-[2rem] h-[2rem] text-default-400 pointer-events-none"><EyeIcon title="Show Password"/></span>							
						)}
					</button>
				}
				type={isNewPasswordVisible ? "text" : "password"}
				className="w-[300px]"
                isInvalid={error.new_password.length > 0}
                color={error.new_password.length > 0 ? "danger" : "default"}
                errorMessage={error.new_password.length > 0 && error.new_password}
			/>
            <Input
				label="Confirm New Password"
				variant="bordered"
				placeholder="ReType New Password"
                autoComplete="confirm_new_password"
				value={re_new_password}
				onValueChange={(value)=> setReNewPassword(value)}
				endContent={
					<button className="focus:outline-none flex align-middle" type="button" onClick={toggleReNewPasswordVisible}>
						{isReNewPasswordVisible ? (
                            <span className="inline-flex w-[2rem] h-[2rem] text-default-400 pointer-events-none"><EyeSlashIcon title="Hide Password"/></span>
							
						) : (
                            <span className="inline-flex w-[2rem] h-[2rem] text-default-400 pointer-events-none"><EyeIcon title="Show Password"/></span>							
						)}
					</button>
				}
				type={isReNewPasswordVisible ? "text" : "password"}
				className="w-[300px]"
                isInvalid={error.re_new_password.length > 0}
                color={error.re_new_password.length > 0 ? "danger" : "default"}
                errorMessage={error.re_new_password.length > 0 && error.re_new_password}
			/>
            <Button color="primary" type="submit" size="lg"
                isLoading={isLoading} className="font-bold"
                startContent={<span className={`align-middle justify-center w-[2rem] text-[2rem] pointer-events-none flex-shrink-0 ${isLoading ? 'hidden':'inline-flex'}`}><FaFloppyDisk /></span>}>
                Save Changes
            </Button>
		</form>
	);
}
