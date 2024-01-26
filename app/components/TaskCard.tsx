
import { useEffect, useState } from "react";
import { Task } from "../redux/taskSlice";
import { Star } from "@mui/icons-material";

export default function TaskCard({ task } : {task: Task}) {
    const createdAt = task.createdAt.toDate()
    const [createdAtMessage, setCreatedAtMessage] = useState('')
    const [dueAtMessage, setDueAtMessage] = useState('')
    const dueAt = task.dueDateTime?.toDate()

    useEffect(() => {
        const current = new Date()
        if(createdAt.toDateString() === current.toDateString()) {
            if(createdAt.getTime() - current.getTime() < 0) {
                switch(true) {
                    case current.getHours() - createdAt.getHours() > 0:
                        setCreatedAtMessage(`${current.getHours() - createdAt.getHours()} hours ago`)
                        break;
                    case current.getMinutes() - createdAt.getMinutes() > 0:
                        setCreatedAtMessage(`${current.getMinutes() - createdAt.getMinutes()} minutes ago`)
                        break;
                    case current.getSeconds() - createdAt.getSeconds() > 0:
                        setCreatedAtMessage(`${current.getSeconds() - createdAt.getSeconds()} seconds ago`)
                        break;
                    default:
                        setCreatedAtMessage('Just now')
                }
            } else {
                setCreatedAtMessage('Just now')
            }
        } else {
            setCreatedAtMessage(createdAt.toLocaleDateString())
        }

        if(dueAt && dueAt.toDateString() === current.toDateString()) {
            if(dueAt.getTime() - current.getTime() > 0) {
                switch(true) {
                    case dueAt.getHours() - current.getHours() > 0:
                        setDueAtMessage(`${dueAt.getHours() - current.getHours()} hours left`)
                        break;
                    case dueAt.getMinutes() - current.getMinutes() > 0:
                        setDueAtMessage(`${dueAt.getMinutes() - current.getMinutes()} minutes left`)
                        break;
                    case dueAt.getSeconds() - current.getSeconds() > 0:
                        setDueAtMessage(`${dueAt.getSeconds() - current.getSeconds()} seconds left`)
                        break;
                    default:
                        setDueAtMessage('Just now')
                }
            } else {
                switch(true) {
                    case current.getHours() - dueAt.getHours() > 0:
                        setDueAtMessage(`${current.getHours() - dueAt.getHours()} hours ago`)
                        break;
                    case current.getMinutes() - dueAt.getMinutes() > 0:
                        setDueAtMessage(`${current.getMinutes() - dueAt.getMinutes()} minutes ago`)
                        break;
                    case current.getSeconds() - dueAt.getSeconds() > 0:
                        setDueAtMessage(`${current.getSeconds() - dueAt.getSeconds()} seconds ago`)
                        break;
                    default:
                        setDueAtMessage('Just now')
                }
            }
        } else if(dueAt) {
            setDueAtMessage(dueAt.toLocaleDateString())
        }
    }, [createdAt, dueAt])

    return (
        <>
            <span className="text-gray-500 col-span-3 sm:col-span-2 md:col-span-1" style={task.status === 'completed' ? {} : { 
                color: dueAt && (dueAt.getTime() - new Date().getTime() > 0) ? 'green' : 'red'
            }}>{dueAtMessage}</span>
            <span className="mb-4 col-span-4 sm:col-span-3 md:col-span-2" style={task.status === 'completed' ? {textDecoration: 'line-through'} : {}}>{task.title}<Star className="text-secondary"/></span>
            <span className="md:max-w-[75%] hidden sm:inline overflow-hidden whitespace-nowrap text-ellipsis ls:col-span-2 md:col-span-4"  style={task.status === 'completed' ? {textDecoration: 'line-through'} : {}}>{task.description}</span>
            <input type="checkbox" className="w-5 h-5 accent-primary justify-self-end" checked={task.status === 'completed'} readOnly/>
        </>
    )
}