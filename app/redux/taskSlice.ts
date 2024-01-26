import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Timestamp } from "firebase/firestore";

export interface Task {
    id: string,
    title: string,
    description: string,
    status: 'active' | 'completed',
    createdAt: Timestamp,
    dueDateTime?: Timestamp,
    completedAt?: string,
    important: boolean,
    tags: string[],
}

export interface TaskState {
    tasks: Task[],
}

const initialState: TaskState = {
    tasks: [],
}

export const getTasks = createAsyncThunk('task/getTasks', async () => {
    const response = await fetch('/api/task/tasks')
    const data = await response.json()
    return data.tasks
})

export const postTask = createAsyncThunk('task/postTask', async (task: Omit<Task, 'id'>) => {
    const response = await fetch('/api/task/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
    const data = await response.json()
    return data.task
})

export const taskSlice = createSlice({
    name: "task",
    initialState/*: {tasks: [] as Task[]}*/,
    reducers: {
        addTask: (state, action) => {
        }
    }
})

export const { addTask } = taskSlice.actions;

export default taskSlice.reducer;

/*
{
        title: "Finish Conquer",
        description: "Finish the conquer app",
        status: 'active',
        createdAt: "2023-10-21T02:24:16.391Z",
        dueDateTime: "2023-10-21T12:24:27.448Z",
        important: true,
        tags: ['work', 'personal'],
        userId: '1',
    }, {
        title: "Finish Conquer",
        description: "Finish the conquer app",
        status: 'completed',
        createdAt: "2023-10-21T02:24:16.391Z",
        dueDateTime: "2023-10-21T02:24:27.448Z",
        completedAt: "2023-10-21T02:24:27.448Z",
        important: true,
        tags: ['work', 'personal'],
        userId: '1',
    }, {
        title: "Finish Conquer",
        description: "Finish the conquer app",
        status: 'active',
        createdAt: "2023-10-21T02:24:16.391Z",
        dueDateTime: "2023-10-21T12:24:27.448Z",
        important: true,
        tags: ['work', 'personal'],
        userId: '1',
    }, {
        title: "Finish Conquer",
        description: "Finish the conquer app",
        status: 'completed',
        createdAt: "2023-10-21T02:24:16.391Z",
        dueDateTime: "2023-10-21T02:24:27.448Z",
        completedAt: "2023-10-21T02:24:27.448Z",
        important: true,
        tags: ['work', 'personal'],
        userId: '1',
    }, {
        title: "Finish Conquer",
        description: "Finish the conquer app",
        status: 'active',
        createdAt: "2023-10-21T02:24:16.391Z",
        dueDateTime: "2023-10-21T02:24:27.448Z",
        completedAt: "2023-10-21T02:24:27.448Z",
        important: true,
        tags: ['work', 'personal'],
        userId: '1',
    }
    */