'use client';

import { Task } from "../redux/taskSlice";
import TaskCard from "./TaskCard";

export default function TasksList({ tasks }: { tasks: Task[] }) {
    return (
        <div className="bg-white grid grid-cols-8 gap-y-5 w-full p-2 py-8 md:p-8 md:rounded-md">
            <span className="mb-4 col-span-3 sm:col-span-2 md:col-span-1">Due</span>
            <span className="mb-4 col-span-4 sm:col-span-3 md:col-span-2">Title</span>
            <span className="mb-4 hidden sm:inline sm:col-span-2 md:col-span-4">Description</span>
            <span className="mb-4 overflow-x-hidden text-ellipsis justify-self-end">Completed</span>
            { tasks.map((task, index) => <TaskCard key={index} task={task}/>) }
        </div>
    )
}