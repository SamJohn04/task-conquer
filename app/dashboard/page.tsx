import ProgressCard from "./components/ProgressCard";
import ImportantTasks from "../components/ImportantTasks";
import { auth } from "../firebase/firebase";
import { redirect } from "next/navigation";

export default function Dashboard() {
    if (auth.currentUser === null) {
        redirect('/login')
    }
    return (
        <main className="flex flex-col items-center py-12 md:p-12 lg:p-24 min-h-screen">
            <div className="flex flex-col md:flex-row w-full md:items-start gap-12 lg:gap-16">
                <ProgressCard />
                <ImportantTasks />
            </div>
        </main>
    )
}