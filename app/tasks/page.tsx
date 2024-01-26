'use client';

import { useSelector } from "react-redux";
import TasksList from "../components/TasksList";
import { useGetPostsQuery } from "../redux/api/task";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import { redirectToLogin } from "../redirectPage";

export default function Tasks() {
    const { user } = useSelector((state: RootState) => state.user)
    useEffect(() => {
        if(!user)
            redirectToLogin()
    }, [user])

    const { data, error, isLoading } = useGetPostsQuery({})
    const tasks = data?.tasks ?? []

    return (
        <main className="flex flex-col items-center py-12 md:p-12 lg:p-24 min-h-screen">
            <div className="flex flex-col md:flex-row w-full md:items-start gap-12 lg:gap-16">
                <TasksList tasks={tasks}/>
            </div>
        </main>
    )
}