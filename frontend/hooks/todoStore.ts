import { apiFetch } from "@/common/axiosDjango";
import { create } from "zustand";
import { ToastSweet } from "@/common/swal";
export type Todo={
    id:number;
    title:string;
    completed:boolean;
}
type TodoStore = {
    list:Todo[];
    error: string;
    createTodo:(value:string)=>Promise<void>;
    setTodo:(value:Todo)=>Promise<void>;
    deleteTodo:(value:Todo)=>Promise<void>;
    setError: (value:string)=>void;
    getList:()=>Promise<void>;
}
const defaultTodoList: Todo[] = []
export const todoStore = create<TodoStore>((set, get) => ({
    list:[...defaultTodoList],    
    error:"",    
    createTodo:(value:string)=>new Promise<void>((resolve)=>{  
        apiFetch(true, `/tasks/`, "post", {title: value})
            .then(response=>{
                console.log(response.data)
                if(response.data){
                    try {                       
                        const todo = response.data as Todo
                        const todoId = Number(todo.id ?? 0)                    
                        if(todoId > 0){
                            ToastSweet({
                                title:`Task ${todoId} Created`,
                                icon: "success",
                                timer: 2000,
                            })
                            const state = get()                                                 
                            set(()=>({list:[...state.list,todo]}))
                        }else{
                            ToastSweet({
                                title:`Cant create Task ${value}`,
                                icon: "error",
                                timer: 2000,
                            })
                        }
                    } catch (e) {
                        console.log(e)
                        ToastSweet({
                            title:`Cant create Task ${value}`,
                            icon: "error",
                            timer: 2000,
                        })
                    }                    
                }                
            })
            .catch(()=>{                           
                ToastSweet({
                    title:`Cant create Task ${value}`,
                    icon: "error",
                    timer: 2000,
                })
            }).finally(()=>resolve())            
    }),
    setTodo:(value:Todo)=>new Promise<void>((resolve)=>{        
        const state = get()
        const stateList = [...state.list]
        const savedTodo = stateList.find(el=>el.id === value.id)
        const list = stateList.filter(el=>el.id !== value.id)
        list.push(value)
        set(()=>({
            list:[...list]
        }))
        apiFetch(true, `/tasks/${value.id}/`, "put", value).then(()=>{
            ToastSweet({
                title:`Task ${value.id} Updated`,
                icon: "success",
                timer: 2000,
            })
        }).catch(()=>{
            const state = get()
            const restoreList = state.list.filter(el=> el.id !== value.id)
            if(savedTodo){
                restoreList.push(savedTodo)
            }
            ToastSweet({
                title:`Task ${value.id} not Updated`,
                icon: "error",
                timer: 2000,
            })            
            set(()=>({                
                list: savedTodo ? [...restoreList] : state.list
            }))
        }).finally(()=>resolve())      
    }),
    deleteTodo: (value)=>new Promise<void>((resolve)=>{
        const state = get()
        const savedList = [...state.list]
        const list = savedList.filter(el=>el.id !== value.id)
        set(()=>({
            list: [...list]
        }))
        apiFetch(true, `/tasks/${value.id}/`, "delete").then(()=>{
            ToastSweet({
                title:`Task ${value.id} deleted`,
                icon: "success",
                timer: 2000,
            })
        }).catch(()=>{
            ToastSweet({
                title:`Rfresh page`,
                icon: "info",
                timer: 2000,
            })
            set(()=>({                
                list: [...savedList]
            }))
        }).finally(()=>resolve())        
    }),
    setError: (value)=>set(()=>({error:value})),
    getList:()=> new Promise<void>(resolve=>{
        apiFetch(true, "/tasks", "get").then(response=>{
            const todos = parseTodos(response.data)
            set(()=>({
                list: [...todos]
            }))
            resolve()
        }).catch((errorCatch)=>{
            const status = Number(errorCatch.response?.status ?? 0);
            console.log(status);
            ToastSweet({
                title:`Bad Connection`,
                icon: "error",
                timer: 2000,
            })
            resolve()
        })
    }),
}));

export const parseTodos = (data:any)=>{
    const defaultArray:Todo[] = []
    if(data && Array.isArray(data)){
        return data.map(el=> el as Todo)
    }
    return defaultArray
}
// export const parseUser = (user: any): User | null => {    
//     if (
//         typeof user === 'object' &&
//         user !== null &&
//         'first_name' in user &&
//         'last_name' in user &&
//         'email' in user &&
//         'is_staff' in user &&
//         'is_superuser' in user &&
//         'is_active' in user
//     ) {        
//         return {
//             first_name: String(user.first_name),
//             last_name: String(user.last_name),
//             email: String(user.email),
//             is_staff: Boolean(user.is_staff),
//             is_superuser: Boolean(user.is_superuser),
//             is_active: Boolean(user.is_active),
//         };
//     } else {        
//         return null;
//     }
// }