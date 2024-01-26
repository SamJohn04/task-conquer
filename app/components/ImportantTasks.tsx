'use client';

import TasksList from "./TasksList";
import { useGetPostsQuery } from "../redux/api/task";
import { Task } from "../redux/taskSlice";
import { CircularProgress } from "@mui/joy";
import { useMemo } from "react";

export default function ImportantTasks() {
    const { data, error, isLoading } = useGetPostsQuery({})
    const tasks = data?.tasks ?? []

    const importantTasks = useMemo<Task[]>(() => (tasks as Task[]).sort((a: Task, b: Task) => {
        if(a.status !== b.status) {
            return a.status === 'completed' ? 1 : -1
        } else if(a.important !== b.important) {
            return b.important ? 1 : -1
        } else if(a.dueDateTime !== undefined && b.dueDateTime !== undefined) {
            return a.dueDateTime > b.dueDateTime ? 1 : -1
        }
        return 0
    }).slice(0, Math.min(tasks.length, 5)), [data])

    if(isLoading || importantTasks === undefined) {
        return (
            <div className="bg-white p-2 py-8 md:p-8 md:rounded-md flex justify-center items-center">
                <CircularProgress />
            </div>
        )
    }

    return (
        <TasksList tasks={importantTasks} />
    )
}