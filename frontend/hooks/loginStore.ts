import { apiFetch } from "@/common/axiosDjango";
import { FormEvent } from "react";
import { create } from "zustand";
import { authStore } from "./authStore";
export type ErrorLogin = {
	email: string;
	password: string;
};

type LoginStore = {
	isLoading: boolean;
	isPasswordVisible: boolean;
	email: string;
	password: string;
	error: ErrorLogin;
    redirectUrl:string;
    setRedirectUrl: (value:string)=>void;
	setEmail: (value: string) => void;
	setPassword: (value: string) => void;
	setError: (value: ErrorLogin) => void;
	setIsLoading: (value: boolean) => void;
	togglePasswordVisible: () => void;
	validate: () => boolean;
    reset: () => void;
    submit: (event:FormEvent<HTMLFormElement>) => Promise<void>;
};

export const loginStore = create<LoginStore>((set, get) => ({
	isLoading: false,
	isPasswordVisible: false,
	email: "",
	password: "",
    redirectUrl:"",
	error: { email: "", password: "" },
    setRedirectUrl:(value)=> set(()=>({redirectUrl:value})),
	setEmail: (value) => set((state) => {
        let email = state.email
        if(!state.isLoading){
            email = value
        }
        return {email, error:{...state.error, email:""}}
    }),
	setPassword: (value) => set((state) => {
        let password = state.password
        if(!state.isLoading){
            password = value
        }
        return {password, error:{...state.error, password:""}}
    }),
	setError: (value) => set(() => ({ error: value })),
	setIsLoading: (value) => set(() => ({ isLoading: value })),
	togglePasswordVisible: () => set((state) => ({ isPasswordVisible: !state.isPasswordVisible })),
	validate: ()=>{
        const state = get()
        let emailError = "";
        let passwordError = "";
        const isValidEmail = state.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i)
        if(state.email.length === 0){
            emailError = "This field is Required"
        }
        else if(!isValidEmail){
            emailError = "Please Enter valid Email"
        }
        if(state.password.length === 0){
            passwordError = "This field is Required"
        }
        else if(state.password.length < 6){
            passwordError = "Enter at least 6 characters"
        }
        const newError = {
            email: emailError,
            password: passwordError
        }
        set(()=>({error:{...newError}}))
        return emailError.length === 0 && passwordError.length ===0
    },
    submit: (event)=>{
        event.preventDefault()        
        return new Promise<void>(resolve=>{
            set(()=>({isLoading:true}))
            const {validate, email, password} = get();
            const isValid = validate();            
            if(isValid){
                apiFetch(false,"/token/login/", "post" ,{ email, password }).then(response=>{
                    console.log("RESPONSE ENDPOINT")
                    console.log(response)                    
                    authStore.getState().getUser().finally(()=>{
                        setTimeout(()=>{
                            set(()=>({isLoading:false}))
                        },500)
                        resolve()
                    })                 
                }).catch(error=>{
                    console.log("RESPONSE Error")
                    if(error?.response?.data?.detail && error?.response?.data?.detail === "No active account found with the given credentials"){
                        set((state)=>({error:{...state.error, password:"Wrong Account Credentials"}}))
                    }
                    set(()=>({isLoading:false}))
                    resolve()
                })
            }else{
                set(()=>({isLoading:false}))
                resolve()
            }
        })
    },
    reset:()=>set(()=>({
        isLoading: false,
        isPasswordVisible: false,
        email: "",
        password: "",
        redirectUrl:"",
        error: { email: "", password: "" }
    }))
}));
