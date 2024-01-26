import { auth, db } from "@/app/firebase/firebase";
import { Task } from "@/app/redux/taskSlice";
import { Timestamp, addDoc, collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        if(!auth.currentUser) {
            return Response.json({error: 'Not logged in'}, {status: 400});
        }
        const collectionRef = collection(db, "tasks", "all_tasks", auth.currentUser.uid);
        const querySnapshot = await getDocs(collectionRef);

        const tasks: Task[] = querySnapshot.docs.map(doc => {
            const {title, description, status, createdAt, dueDateTime, completedAt, important, tags} = doc.data()
            return {
                id: doc.id,
                title,
                description,
                status,
                createdAt,
                dueDateTime,
                completedAt,
                important,
                tags,
            }
        })

        return Response.json({ tasks }, {status: 200})
    } catch(error) {
        console.log(error)
        return Response.json({error: 'Something went wrong'}, {status: 400})
    }
}

export async function POST(request: NextRequest) {
    if(!auth.currentUser) {
        return Response.json({error: 'Not logged in'}, {status: 400});
    }

    const collectionRef = collection(db, "tasks", "all_tasks", auth.currentUser.uid);
    let {title, description, status, createdAt, dueDateTime, completedAt, important, tags} = await request.json()
    if(!title || typeof title !== 'string') {
        return Response.json({error: 'Title is required'}, {status: 400})
    } else if(!description || typeof description !== 'string') {
        return Response.json({error: 'Description is required'}, {status: 400})
    }
    if(status !== 'active' || status !== 'completed') {
        status = 'active'
    }
    if(!createdAt) {
        createdAt = Timestamp.now()
    }
    if(dueDateTime) {
        dueDateTime = Timestamp.fromDate(new Date(dueDateTime))
    }
    if(important === undefined || typeof important !== 'boolean') {
        important = false
    }
    if(!tags || !Array.isArray(tags)) {
        tags = []
    }

    const newTask: Omit<Task, 'id'> = {
        title,
        description,
        status,
        createdAt,
        dueDateTime,
        completedAt,
        important,
        tags,
    }

    const docRef = await addDoc(collectionRef, newTask);
    const task: Task = {
        id: docRef.id,
        ...newTask
    }

    return Response.json({task}, {status: 200})
}

export async function DELETE(request: NextRequest) {
    try {
        if(!auth.currentUser) {
        return Response.json({error: 'Not logged in'}, {status: 400})
        }
        const {id} = await request.json()
        if(!id || typeof id !== 'string') {
            return Response.json({error: 'id is required'}, {status: 400})
        }
        const docRef = doc(db, "tasks", "all_tasks", auth.currentUser.uid, id);
        await deleteDoc(docRef)
        return Response.json({success: true}, {status: 200})
    } catch (error) {
        return Response.json({error: 'Something went wrong'}, {status: 400})
    }
}

export async function PUT(request: NextRequest) {
    try {
        if(!auth.currentUser) {
            return Response.json({error: 'Not logged in'}, {status: 400})
        }
        let {id, title, description, status, createdAt, dueDateTime, completedAt, important, tags} = await request.json()
        if (!id || typeof id !== 'string') {
            return Response.json({error: 'id is required'}, {status: 400})
        } else if(!title || typeof title !== 'string') {
            return Response.json({error: 'Title is required'}, {status: 400})
        } else if(!description || typeof description !== 'string') {
            return Response.json({error: 'Description is required'}, {status: 400})
        }
        if(status !== 'active' || status !== 'completed') {
            status = 'active'
        }
        if(!createdAt) {
            createdAt = Timestamp.now()
        }
        if(dueDateTime) {
            dueDateTime = Timestamp.fromDate(new Date(dueDateTime))
        }
        if(important === undefined || typeof important !== 'boolean') {
            important = false
        }
        if(!tags || !Array.isArray(tags)) {
            tags = []
        }
        const docRef = doc(db, "tasks", "all_tasks", auth.currentUser.uid, id);
        await setDoc(docRef, {
            title,
            description,
            status,
            createdAt,
            dueDateTime,
            completedAt,
            important,
            tags,
        }, {merge: true})
    } catch (error) {
        return Response.json({error: 'Something went wrong'}, {status: 400})
    }
}