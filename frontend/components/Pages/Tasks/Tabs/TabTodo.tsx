import { todoStore } from "@/hooks/todoStore"
import TodoElement from "../TodoELement"
import TodoCreate from "../TodoCreate"
import { useEffect } from "react"

export default function TabTodo({completed=false}:{completed:boolean}){
    const { list } = todoStore()
    const elements = list.filter(el=> el.completed === completed).sort((a,b)=> b.id-a.id)

    return <>
        <div className="flex justify-center">
            <div className="w-full md:w-1/2 flex flex-col justify-normal gap-4 mt-4">
                {!completed && <TodoCreate />}                
                {elements.map(todo=>(
                    <TodoElement key={`todo-${todo.id}`} todo={todo} />
                ))}
            </div>
        </div>
    </>
}