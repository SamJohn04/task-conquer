'use client';

import { useGetPostsQuery } from "@/app/redux/api/task";
import { Task } from "@/app/redux/taskSlice";
import { ArrowForward } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/joy";
import Link from "next/link";

export default function ProgressCard() {
    let username;
    const { data, error, isLoading } = useGetPostsQuery({})
    const tasks = data?.tasks ?? []
    if(isLoading) {
        return (
            <div className="bg-white/75 p-8 min-w-[20%] flex justify-center items-center">
                <CircularProgress />
            </div>
        )
    } else if(error !== undefined) {
        console.log(error);
        return <></>
        // <div className="flex justify-center items-center">
        //     <div className="bg-rose-300 p-4 rounded-lg">{error}</div>
        // </div>
    }

    let message;

    if(tasks.length === 0) {
        message = "You don't have any tasks yet!"
    }
    console.log('tasks', tasks)
    const completedTasks = tasks?.filter((task: Task) => task.status === 'completed')

    const progressValue = completedTasks.length / tasks.length * 100

    switch(true) {
        case progressValue === 0:
            message = "Always a good time to start!"
            break;
        case progressValue < 25:
            message = "You're off to a good start!"
            break;
        case progressValue < 50:
            message = "Keep it up!"
            break;
        case progressValue === 50:
            message = "Halfway there!"
            break;
        case progressValue < 75:
            message = "You're almost there!"
            break;
        case progressValue < 100:
            message = "You're really close!"
            break;
        case progressValue === 100:
            message = "You've completed all your tasks!"
            break;
    }

    
    return (
        <div className="bg-white/75 p-8 min-w-[20%] gap-8 sm:rounded flex flex-col items-start">
            <h3 className="self-start text-md md:text-lg lg:text-xl font-bold">Hello, {username}!</h3>
            <p>{message}</p>
            <div className="flex gap-4 items-center" style={tasks.length === 0 ? {visibility: 'hidden'} : {}}>
                <CircularProgress size="lg" determinate value={progressValue} >
                    {completedTasks.length}/{tasks.length}
                </CircularProgress>
                <div className="flex flex-col justify-between">
                    <span className="text-gray-500">Your Progress</span>
                    <span className="text-3xl font-bold">{progressValue}%</span>
                </div>
            </div>
            <Link className="w-full" href={`/tasks`}><Button className="group"><span className="pr-4">Go to Tasks</span> <ArrowForward className="w-0 group-hover:w-4 transition-all duration-750"/></Button></Link>
        </div>
    )
}