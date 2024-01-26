import { Login } from "@mui/icons-material";
import { IconButton } from "@mui/joy";

export default function Navbar() {
    return (
        <header className="bg-white p-4 flex flex-row w-full md:items-start gap-12 lg:gap-16">
            <div className="flex flex-col w-full md:w-1/2">
                <h1 className="text-4xl font-bold text-gray-800">Conquer</h1>
                <p className="text-gray-600">Conquer your tasks</p>
            </div>
            <div className="flex flex-col w-full md:w-1/2">
                <div className="flex flex-row md:justify-end gap-4">
                    <IconButton ><Login /></IconButton>
                </div>
            </div>
        </header>
    )
}