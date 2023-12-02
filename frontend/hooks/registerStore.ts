import { create } from "zustand";
import { FormEvent } from "react";
import { validateEmail, validateText, validateSame, validatePassword } from "@/common/validations";
import { apiFetch } from "@/common/axiosDjango";

export type ErrorRegister = {
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	re_password: string;
    other:string;
};

type RegisterStore = {
	isLoading: boolean;
    isRegister: boolean;
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	re_password: string;
	error: ErrorRegister;
	isPasswordVisible: boolean;
	isRePasswordVisible: boolean;
	setEmail: (value: string) => void;
	setPassword: (value: string) => void;
	setRePassword: (value: string) => void;
	setFirstName: (value: string) => void;
	setLastName: (value: string) => void;
    setError: (value: ErrorRegister) => void;
	togglePasswordVisible: () => void;
	toggleRePasswordVisible: () => void;
    setIsRegister:(value:boolean)=> void;
	validate: () => boolean;
    reset:()=>void;
	submit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
};

export const registerStore = create<RegisterStore>((set, get) => ({
	isLoading: false,
    isRegister: false,
	first_name: "",
	last_name: "",
	email: "",
	password: "",
	re_password: "",
	error: {
		first_name: "",
		last_name: "",
		email: "",
		password: "",
		re_password: "",
        other:""
	},
	isPasswordVisible: false,
	isRePasswordVisible: false,
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
	setRePassword: (value) => set((state) => {
        let re_password = state.re_password
        if(!state.isLoading){
            re_password = value
        }
        return {re_password, error:{...state.error, re_password:""}}
    }),
	setFirstName: (value) => set((state) => {
        let first_name = state.first_name
        if(!state.isLoading){
            first_name = value
        }
        return {first_name, error:{...state.error, first_name:""}}
    }),
	setLastName: (value) => set((state) => {
        let last_name = state.last_name
        if(!state.isLoading){
            last_name = value
        }
        return {last_name, error:{...state.error, last_name:""}}
    }),
	togglePasswordVisible: () => set((state) => ({ isPasswordVisible: !state.isPasswordVisible })),
	toggleRePasswordVisible: () => set((state) => ({ isRePasswordVisible: !state.isRePasswordVisible })),
    setIsRegister:(value)=>set(()=>({isRegister:value})),
    setError: (value) => set(()=>({error: {...value}})),
	validate: () => {
		const regFirstLast = /^[a-zA-Zñáéíóúü\s]*[a-zA-Zñáéíóúü][a-zA-Zñáéíóúü\s]*$/;
		const regPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-zñáéíóúü\d!@#$%^&*.]{6,}$/;
		const { first_name, last_name, email, password, re_password } = get();
		const validationFirstName = validateText(first_name, true, regFirstLast);
		const errorFirstName = validationFirstName === "required" ? "This field is required" : validationFirstName === "regExp" ? "Please enter valid first name" : "";
		const validationLastName = validateText(last_name, true, regFirstLast);
		const errorLastName = validationLastName === "required" ? "This field is required" : validationLastName === "regExp" ? "Please enter valid last name" : "";
		const validationPassword = validatePassword(password, true, regPassword);
		const errorPassword = validationPassword === "required" ? "This field is required" : validationPassword === "regExp" ? "Please enter valid password" : "";
		const validationRePassword = validateSame(re_password, password, true);
		const errorRePassword = validationRePassword === "required" ? "This field is required" : validationRePassword === "not-same" ? "Please enter same password" : "";
		const validationEmail = validateEmail(email, true);
		const errorEmail = validationEmail === "required" ? "This field is required" : validationEmail === "regExp" ? "Please enter valid email" : "";
		const newError = {
			first_name: errorFirstName,
			last_name: errorLastName,
			email: errorEmail,
			password: errorPassword,
			re_password: errorRePassword,
            other:""
		};
		set(() => ({ error: { ...newError } }));
		return !(errorFirstName.length > 0 || errorLastName.length > 0 || errorEmail.length > 0 || errorPassword.length > 0 || errorRePassword.length > 0);
	},
	submit: (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		return new Promise<void>((resolve) => {
			set(()=>({isLoading:true}))
            const {validate, first_name, last_name, email, password, re_password, error} = get();
            const isValid = validate();
            if(isValid){
                apiFetch(false,"/users/", "post", { first_name, last_name, email, password, re_password })                
                    .then(response=>{
                        console.log(response)
                        set(()=>({isLoading:false, isRegister:true}))
                        resolve()
                    }).catch(err=>{
                        const newError = {...error}
                        if(err?.response?.data){
                            const errors: { [key: string]: any } = err.response.data as { [key: string]: any };
                            const keys:string[] = Object.keys(errors)
                            if(keys.includes("password")){
                                newError.password = "Please enter a valid password"
                            }
                            if(keys.includes("non_field_errors")){
                                newError.password = "Confirm and Password not same"
                            }
                            if(keys.includes("email")){
                                newError.email = "User email already registered"
                            }
                            if(keys.includes("detail")){
                                newError.other = "Contact to support or check connection"
                            }
                        }
                        else{
                            newError.other = "Contact to support or check connection"
                        }
                        set(()=>({isLoading: false, isRegister:false, error:{...newError}}))
                        resolve()
                    })
            }else{
                set(()=>({isLoading:false}))
                resolve()
            }
		});
	},
    reset: ()=>set(()=>({
        isLoading: false,
        isRegister: false,
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        re_password: "",
        error: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            re_password: "",
            other:""
        },
        isPasswordVisible: false,
        isRePasswordVisible: false,
    }))
}));
