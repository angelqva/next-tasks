import { Todo, todoStore } from "@/hooks/todoStore";
import { useEffect, useRef, useState } from "react";
import { Input } from "@nextui-org/input";
import { SquaresPlusIcon, InboxArrowDownIcon, XCircleIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { SweetAlert, ToastSweet } from "@/common/swal";

export default function TodoCreate() {
	const { createTodo } = todoStore();
	const [title, setTitle] = useState<string>("");
    const inputRef = useRef<HTMLInputElement| null>(null)
    const [errorTitle, setErrorTitle] = useState<string>("");
	const [isCreate, setIsCreate] = useState<boolean>(false);
    const sendCreate = ()=>{
        if(title.length > 0 ){            
            createTodo(title)
            setIsCreate(false)
            setTitle("")
        }
        else{
            setErrorTitle("This field is required")
            SweetAlert.fire({
                title:`Title Required`,
                html: `<p><b>Please</b>, type valid title</p>`,                
                icon:"error"
            })
        }
    }
	return (
		<>
			<div className="flex w-full">
				{isCreate ? (
					<>
						<Input
                            ref={inputRef}
							fullWidth={true}
							label="Type Task Title"
							variant="bordered"
							placeholder="Enter Todo title you can press enter to finish"
							value={title}
							onValueChange={(value) => {
                                if(errorTitle.length){
                                    setErrorTitle("")
                                }
                                setTitle(value)
                            }}
                            onKeyDown={(e)=>{
                                if(e.key === "Enter"){                                    
                                    e.preventDefault()
                                    
                                    sendCreate()
                                }
                            }}
							endContent={
								<div className="flex gap-4 justify-center items-center h-full">
									<button
										className="focus:outline-none flex item-center"
										type="button"
										onClick={() => {
											setIsCreate(false);
											setTitle("");
										}}
									>
										<span className="inline-flex w-[1.5rem] h-[1.5rem] text-danger-400 ml-4 ">
											<XCircleIcon title="Cancel" />
										</span>
									</button>
									<button className="focus:outline-none flex item-center" type="button" onClick={sendCreate}>
										<span className="inline-flex w-[1.5rem] h-[1.5rem] text-success-400 ">
											<InboxArrowDownIcon title="Save Task" />
										</span>
									</button>
								</div>
							}
							type="text"
							className="font-bold min-h-[68px] input-custom-height"
							isInvalid={errorTitle.length > 0}
							color={errorTitle.length > 0 ? "danger" : "default"}
						/>
					</>
				) : (
					<>
						<div
							className={clsx({
								"w-full gap-4 font-bold cursor-pointer h-full p-4 text-lg flex justify-center items-center  border-solid border-medium rounded-medium bg-success/40 border-success-200 hover:border-success-400": true,
							})}
                            role="button"
                            onClick={() => {
                                setIsCreate(true)
                                setTimeout(()=>{                                    
                                    if(inputRef.current){                                        
                                        inputRef.current.focus()
                                    }
                                }, 100)                                
                            }}
						>
							<span className="inline-flex w-[2rem] h-[2rem] text-black-400 dark:text-white ">
                                <SquaresPlusIcon title="Add Task" />
                            </span>
							<span>Add New Task</span>
						</div>
					</>
				)}
			</div>
		</>
	);
}
