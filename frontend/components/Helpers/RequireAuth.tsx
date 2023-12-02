"use client"
import Link from "next/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import { authStore } from "@/hooks/authStore"
import { useRouter } from "next/navigation"
import { Spinner } from "@nextui-org/spinner";

export default function RequireAuth({children}:{children:React.ReactNode}){
    const router = useRouter()
    const {isChecking, isAuthenticated} = authStore()
    if(isChecking){
        return <>
            <h1 className="h-title"><Spinner size="lg" className="mr-4"/>Loading</h1>
        </>
    }
    if(!isAuthenticated){
        return <>
            <h1 className="h-title">401 | Not Authorized</h1>
            <p className="h-description">This page require authentication</p>
            <div className="flex justify-center mt-8">
                <Link className={buttonStyles({ size:"lg", color: "secondary", variant: "ghost", radius: "full" })} href="/auth/login">
                    <span className={`align-middle w-[1.5rem] h-[1.5rem] flex-shrink-0 `}>
                        <ArrowLeftOnRectangleIcon />
                    </span>
                    <span className="font-bold pr-4 text-lg">Go to Authentication</span>
                </Link>
            </div>
            
        </>
    }
    else{
        return <>{children}</>
    }
}