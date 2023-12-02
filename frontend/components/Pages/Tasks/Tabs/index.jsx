"use client"
import { Tabs, Tab } from "@nextui-org/tabs";
import { Chip } from "@nextui-org/chip";
import { ClipboardDocumentListIcon, ClipboardDocumentCheckIcon } from "@heroicons/react/24/solid"
import TabTodo from "./TabTodo"
import { todoStore } from "@/hooks/todoStore";
import { useEffect } from "react";

export default function TasksTabs() {
    const {getList, list} = todoStore()
    const todosCount = list.filter(el=> !el.completed).length
    const completedCount = list.filter(el=> el.completed).length
    useEffect(()=>{
        getList()
    }, [getList])
    return <>
        <h1 className="h-title">Manage your Tasks</h1>
        <div className="flex w-full flex-col">
            <Tabs
                aria-label="Options"
                color="primary"
                variant="underlined"
                classNames={{
                    panel:"data-[focus-visible=true]:outline-0",
                    tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider sm:justify-center justify-between",
                    cursor: "w-full bg-primary",
                    tab: "max-w-fit px-0 h-12",
                    tabContent: "group-data-[selected=true]:text-primary text-lg font-bold"
                }}
            >
                <Tab
                    key="todo"
                    title={
                        <div className="flex items-center space-x-2">
                            <span className={`align-middle w-[1.5rem] h-[1.5rem] flex-shrink-0 `}>
                                <ClipboardDocumentListIcon />
                            </span>
                            <span>Tasks ToDo</span>
                            <Chip size="sm" variant="faded">{todosCount}</Chip>
                        </div>
                    }
                >
                    <TabTodo />
                </Tab>
                <Tab
                    key="completed"
                    title={
                        <div className="flex items-center space-x-2">
                            <span className={`align-middle w-[1.5rem] h-[1.5rem] flex-shrink-0 `}>
                                <ClipboardDocumentCheckIcon />
                            </span>
                            <span>Tasks Completed</span>
                            <Chip size="sm" variant="faded">{completedCount}</Chip>
                        </div>
                    }
                >
                    <TabTodo completed={true}/>
                </Tab>
            </Tabs>
        </div>
    </>
}