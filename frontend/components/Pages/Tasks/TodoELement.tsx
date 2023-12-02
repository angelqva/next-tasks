import { Todo, todoStore } from "@/hooks/todoStore";
import { useEffect, useRef, useState } from "react";
import { Input } from "@nextui-org/input";
import { TrashIcon, PencilSquareIcon, InboxArrowDownIcon, XCircleIcon, ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { SweetAlert, ToastSweet } from "@/common/swal";

export default function TodoElement({ todo }: { todo: Todo }) {
	const { setTodo, deleteTodo } = todoStore();
	const [title, setTitle] = useState<string>("");
	const [errorTitle, setErrorTitle] = useState<string>("");
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement | null>(null);
	useEffect(() => {
		if (todo) {
			setTitle(todo.title);
		}
	}, [todo, setTitle]);

	const sendSetEdit = () => {
		if (title.length > 0) {
			if (title === todo.title) {
				ToastSweet({
					title: `Task #${todo.id} Nothing Changed`,
					icon: "info",
					timer: 2000,
				});
			} else {				
				setTodo({ ...todo, title });
			}
			setIsEdit(false);
		} else {
			setErrorTitle("This field is required");
			SweetAlert.fire({
				title: `Title Required`,
				html: `<p><b>Task ${todo.id} need a title, type valid title</p>`,
				icon: "error",
			});
		}
	};
	const sendComplete = () => {
		SweetAlert.fire({
			title: `Change to Complete?`,
			html: `<p><b>Task ${todo.id}</b> will be change and appear in completed tasks</p>`,
			icon: "question",
			confirmButtonText: "Yes, Complete!",
			showCancelButton: true,
		}).then((result) => {
			if (result.isConfirmed) {
				setTodo({ ...todo, completed: true });				
			}
		});
	};
	const sendDelete = () => {
		SweetAlert.fire({
			title: `Are you shure?`,
			html: `<p><b>Task ${todo.id}</b> will be deleted</p>`,
			icon: "question",
			confirmButtonText: "Yes, Delete!",
			showCancelButton: true,
		}).then((result) => {
			if (result.isConfirmed) {
				deleteTodo(todo);				
			}
		});
	};
	return (
		<>
			<div className="flex w-full">
				{isEdit ? (
					<>
						<Input
							ref={inputRef}
							fullWidth={true}
							label="Type new Title"
							variant="bordered"
							placeholder="Enter task title"
							value={title}
							onValueChange={(value) => {
								if (errorTitle.length) {
									setErrorTitle("");
								}
								setTitle(value);
							}}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									sendSetEdit();
								}
							}}
							endContent={
								<div className="flex gap-4 justify-center items-center h-full">
									<button
										className="focus:outline-none flex item-center"
										type="button"
										onClick={() => {
											setIsEdit(false);
											setTitle(todo.title);
										}}
									>
										<span className="inline-flex w-[1.5rem] h-[1.5rem] text-danger-400 ml-4 ">
											<XCircleIcon title="Cancel" />
										</span>
									</button>
									<button className="focus:outline-none flex item-center" type="button" onClick={sendSetEdit}>
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
						<h1
							className={clsx({
								"w-full cursor-pointer h-full p-2 flex justify-between items-center  border-solid border-medium rounded-medium": true,
								"bg-primary/10 border-primary-200 hover:border-primary-400": !todo.completed,
								"bg-success-100/40 border-success-200 hover:border-success-400": todo.completed,
							})}
							onDoubleClick={() => {
                                if(!todo.completed){
                                    setIsEdit(true);
                                    setTimeout(() => {
                                        if (inputRef.current) {
                                            inputRef.current.focus();
                                            inputRef.current.select();
                                        }
                                    }, 100);
                                }								
							}}
						>
							<span className="flex flex-col">
								<span className={clsx({
                                    "text-primary": !todo.completed,
                                    "text-success-700": todo.completed
                                })}>Task {todo.id}:</span>
								<span className="font-semibold text-lg">{todo.title}</span>
							</span>
							{todo.completed ? (
								<span className="flex gap-4 justify-center items-center">
									<button className="focus:outline-none flex item-center" type="button">
										<span className="inline-flex w-[1.5rem] h-[1.5rem] text-success-400 ml-4 ">
											<ClipboardDocumentCheckIcon title="Completed Task" />
										</span>
									</button>
								</span>
							) : (
								<span className="flex gap-4 justify-center items-center">
									<button className="focus:outline-none flex item-center" type="button" onClick={sendComplete}>
										<span className="inline-flex w-[1.5rem] h-[1.5rem] text-success-400 ml-4 ">
											<ClipboardDocumentCheckIcon title="Completed Task" />
										</span>
									</button>
									<button
										className="focus:outline-none flex item-center"
										type="button"
										onClick={() => {
											setIsEdit(true);
											setTimeout(() => {
												if (inputRef.current) {
													inputRef.current.focus();
                                                    inputRef.current.select();
												}
											}, 100);
										}}
									>
										<span className="inline-flex w-[1.5rem] h-[1.5rem] text-warning-400 ">
											<PencilSquareIcon title="Edit Task" />
										</span>
									</button>
									<button className="focus:outline-none flex item-center" type="button" onClick={sendDelete}>
										<span className="inline-flex w-[1.5rem] h-[1.5rem] text-danger-400">
											<TrashIcon title="Delete Task" />
										</span>
									</button>
								</span>
							)}
						</h1>
					</>
				)}
			</div>
		</>
	);
}
