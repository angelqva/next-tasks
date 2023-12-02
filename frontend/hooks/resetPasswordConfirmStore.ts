import {create} from "zustand";
import { FormEvent } from "react";
import { validateSame, validatePassword } from "@/common/validations";
import { apiFetch } from "@/common/axiosDjango";

export type ErrorResetPasswordConfirm = {
	new_password: string;
    re_new_password: string;
    other: string;
};

type ResetPasswordConfirmStore = {
    isResetConfirm: boolean;
    isLoading: boolean;
	new_password: string;
    uid:string;
    token:string;
    re_new_password: string;
	error: ErrorResetPasswordConfirm;
    isNewPasswordVisible: boolean;
    isReNewPasswordVisible: boolean;
    setError: (value: ErrorResetPasswordConfirm) => void
	setNewPassword: (value: string) => void;
    setReNewPassword: (value: string) => void;
    toggleNewPasswordVisible: () => void;
    toggleReNewPasswordVisible: () => void;
    setTokens: ({uid, token}:{uid:string; token:string}) => void
	validate: () => boolean;
    reset: ()=>void;
    submit: (event:FormEvent<HTMLFormElement>) => Promise<void>;
};

export const resetPasswordConfirmStore = create<ResetPasswordConfirmStore>((set, get) => ({
    isResetConfirm: false,
    isLoading:false,    
	new_password: "",
    uid: "",
    token:"",
    re_new_password:"",
	error: {
        new_password: "",
        re_new_password:"",
        other: ""
	},
    isNewPasswordVisible: false,
    isReNewPasswordVisible: false,
	setNewPassword: (value) => set((state) => {
        let new_password = state.new_password
        if(!state.isLoading){
            new_password = value
        }
        return {new_password, error:{...state.error, new_password:""}}
    }),
	setReNewPassword: (value) => set((state) => {
        let re_new_password = state.re_new_password
        if(!state.isLoading){
            re_new_password = value
        }
        return {re_new_password, error:{...state.error, re_new_password:""}}
    }),
    toggleNewPasswordVisible: () => set((state) => ({ isNewPasswordVisible: !state.isNewPasswordVisible })),
    toggleReNewPasswordVisible: () => set((state) => ({ isReNewPasswordVisible: !state.isReNewPasswordVisible })),
    setError: (value)=>set(()=>({error: {...value}})),
	validate: () => {		
		const regPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-zñáéíóúü\d!@#$%^&*.]{6,}$/;
        const { re_new_password, new_password } = get();
		const validationPassword = validatePassword(new_password, true, regPassword);
		const errorPassword = validationPassword === "required" ? "This field is required" : validationPassword === "regExp" ? "Please enter valid password" : "";
		const validationRePassword = validateSame(re_new_password, new_password, true);
		const errorRePassword = validationRePassword === "required" ? "This field is required" : validationRePassword === "not-same" ? "Please enter same password" : "";
		const newError = {			
			new_password: errorPassword,
			re_new_password: errorRePassword,
            other:""
		};
		set(() => ({ error: { ...newError } }));
		return !(errorPassword.length > 0 || errorRePassword.length > 0);
	},
    setTokens: ({uid, token})=>set(()=>({uid, token})),
    submit: (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        return new Promise<void>(resolve=>{
            set(()=>({isLoading:true}))
            const {uid, token, new_password, re_new_password, error} = get();
            apiFetch(false,"/users/reset_password_confirm/", "post", {uid, token, new_password, re_new_password})
                .then(()=>{
                    set(()=>({isLoading:false, isResetConfirm:true}))
                    resolve()
                })
                .catch((err)=>{
                    const newError = {...error}
                    if(err?.response?.data){
                        const errors: { [key: string]: any } = err.response.data as { [key: string]: any };
                        const keys:string[] = Object.keys(errors)
                        if(keys.includes("new_password")){
                            newError.new_password = "Please enter a valid password"
                        }
                        if(keys.includes("non_field_errors")){
                            newError.re_new_password = "Confirm and Password not same"
                        }
                        if(keys.includes("detail")){
                            newError.other = "Contact to support or check connection"
                        }
                        else{
                            newError.other = "Token invalid or expired, contact Support Team"
                        }
                    }else{
                        newError.other = "Contact to support or check connection"
                    }
                    set(()=>({isLoading:false, error:{...newError}}))
                    resolve()
                })
            
        })
    },
    reset: () => set(()=>({
        isResetConfirm: false,
        isLoading:false,    
        new_password: "",
        uid: "",
        token:"",
        re_new_password:"",
        error: {
            new_password: "",
            re_new_password:"",
            other: ""
        },
        isNewPasswordVisible: false,
        isReNewPasswordVisible: false,
    }))
}));