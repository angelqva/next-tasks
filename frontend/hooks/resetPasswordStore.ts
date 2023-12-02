import { apiFetch } from "@/common/axiosDjango";
import { FormEvent } from "react";
import { create } from "zustand";

export type ErrorResetPassword = {
	email: string;
    other: string;
};

type ResetPasswordStore = {
    isEmailSend: boolean;
	isLoading: boolean;
	email: string;
	error: ErrorResetPassword;
	setEmail: (value: string) => void;
	setError: (value: ErrorResetPassword) => void;
	setIsLoading: (value: boolean) => void;
	validate: () => boolean;
    submit: (event:FormEvent<HTMLFormElement>) => Promise<void>;
    reset: ()=>void;
};

export const resetPasswordStore = create<ResetPasswordStore>((set, get) => ({
    isEmailSend: false,
	isLoading: false,
	email: "",
	error: {email: "", other:""},
	setEmail: (value) => set((state) => {
        let email = state.email
        if(!state.isLoading){
            email = value
        }
        return {email, error:{...state.error, email:""}}
    }),
	setError: (value) => set(() => ({ error: value })),
	setIsLoading: (value) => set(() => ({ isLoading: value })),
	validate: ()=>{
        const state = get()
        let emailError = "";
        const isValidEmail = state.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i)
        if(state.email.length === 0){
            emailError = "This field is Required"
        }
        else if(!isValidEmail){
            emailError = "Please Enter valid Email"
        }
        const newError = {
            email: emailError,
        }
        set(()=>({error:{...newError, other:""}}))
        return emailError.length === 0
    },
    submit: (event)=>{
        event.preventDefault()        
        return new Promise<void>(resolve=>{
            set(()=>({isLoading:true}))
            const {validate, email} = get();
            const isValid = validate();            
            if(isValid){
                apiFetch(false,"/users/reset_password/", "post" ,{email})                
                    .then(()=>{
                        set(()=>({isLoading:false, isEmailSend:true}))
                    })
                    .catch(()=>{
                        set((state)=>({isLoading:false, error:{...state.error, other:"Check your internet connection"}}))
                    })
            }else{
                set(()=>({isLoading:false}))
                resolve()
            }                      
        })
    },
    reset:()=>set(()=>({
        isEmailSend: false,
        isLoading: false,
        email: "",
        error: {email: "", other:""},
    }))
}));
