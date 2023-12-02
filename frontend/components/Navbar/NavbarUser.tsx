"use client";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import { authStore } from "@/hooks/authStore";
import { useEffect } from "react";
import { SweetAlert } from "@/common/swal";

export default function NavbarUser() {
    const {isAuthenticated, user, logout, setIsLogedOut, isLogedOut, error, setError, setIsChecking} = authStore()
    useEffect(()=>{
        setIsChecking(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    useEffect(()=>{
        if(error.length >0){
            SweetAlert.fire({
                title: "Something Wrong",
                html: `<p>${error}</p>`,
                icon:"error"
            }).then(()=>{
                setError("")
            })
        }
    }, [error, setError])
    useEffect(()=>{
        if(isLogedOut){
            SweetAlert.fire({
                title:"Success LogOut",
                html:"Come back soon!!",
                icon:"success",
            }).then(()=>{
                setIsLogedOut(false)
            })
        }
    }, [isLogedOut, setIsLogedOut])
    const sendLogout = ()=>{
        SweetAlert.fire({
            title:"Do you want LogOut",
            icon:"question",
            html:"<p>Is Authetntication required, will be redirected</p>",
            confirmButtonText: "Yes, LogOut",
            showCancelButton:true,
            cancelButtonText:"Cancel"
        }).then((result)=>{
            if(result.isConfirmed){
                logout()
            }
        })
    }
	return (
		<>
        {isAuthenticated ? (
            <Dropdown placement="bottom-end">
                <DropdownTrigger>
                    <Avatar isBordered as="button" className="transition-transform" color="secondary" showFallback size="sm" />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="profile" className="h-14 gap-2" aria-label="profile">
                        <p className="font-semibold">Signed in as</p>
                        <p className="font-semibold">{user && user.email}</p>
                    </DropdownItem>
                    <DropdownItem key="logout" color="danger" aria-label="logout" onClick={()=>{
                        sendLogout()
                    }}>
                        Log Out
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        ): <></>}			
		</>
	);
}
