import { apiFetch } from "@/common/axiosDjango";
import { create } from "zustand";

export type User={
    first_name: string;
    last_name:string;
    email:string;
    is_staff:boolean;
    is_superuser:boolean;
    is_active:boolean;
}
type AuthStore = {
    isAuthenticated: boolean;
    isLogedOut: boolean;
    isChecking: boolean;
    user: User | null;
    error: string;
    activationResponse: string
    setUser: (value:User) => void;
    setIsAuthenticated: (value:boolean) => void;
    getUser: ()=>Promise<void>;
    logout: ()=>Promise<void>;
    setIsLogedOut: (value:boolean)=>void,
    setError: (value:string)=>void,
    setIsChecking:(value:boolean)=>void
}

export const authStore = create<AuthStore>((set, get) => ({
    isAuthenticated: false,
    isChecking:true,
    isLogedOut:false,
    user: null,
    error: "",
    activationResponse:"",
    setUser: (value) => set(()=>({user:value})),
    setIsAuthenticated: (value) => set(()=>({isAuthenticated:value})),
    setIsLogedOut:(value)=>set(()=>({isLogedOut:value})),
    setError:(value)=>set(()=>({error:value})),
    setIsChecking: (value:boolean)=>{
        set(()=>({isChecking:value}))
        if(value){
            get().getUser()
        }        
    },
    getUser: ()=>{
        return new Promise<void>(resolve => {
            apiFetch(true,"/users/manage/me/", "get").then(response=>{
                set(()=>{
                    const userData = parseUser(response.data)                    
                    return {
                        user: userData,
                        isAuthenticated: userData ? true : false,
                        isChecking:false                    
                    }                    
                })
                resolve()
            }).catch(error=>{
                set(()=>({
                    isAuthenticated:false,
                    user:null,
                    isChecking:false
                }))
            })
        })
    },
    logout:()=>{
        return new Promise<void>(resolve=>{
            const state = get()
            apiFetch(false,"/token/logout/", "post").then(()=>{
                set(()=>({
                    isLogedOut:true,
                    isAuthenticated:false,
                    user:null
                }))
                resolve()
            }).catch(()=>{
                state.setError("Check your Connection!!")
                resolve()
            })
            resolve()
        })
    }
}));


export const parseUser = (user: any): User | null => {    
    if (
        typeof user === 'object' &&
        user !== null &&
        'first_name' in user &&
        'last_name' in user &&
        'email' in user &&
        'is_staff' in user &&
        'is_superuser' in user &&
        'is_active' in user
    ) {        
        return {
            first_name: String(user.first_name),
            last_name: String(user.last_name),
            email: String(user.email),
            is_staff: Boolean(user.is_staff),
            is_superuser: Boolean(user.is_superuser),
            is_active: Boolean(user.is_active),
        };
    } else {        
        return null;
    }
}