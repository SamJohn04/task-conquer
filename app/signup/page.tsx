'use client';
import { Button, Input } from "@mui/joy";
import Link from "next/link";
import React from "react";
import { signup, validateLoggedOut } from "../action/authValidate";

export default function SignUp() {
    const [error, setError] = React.useState<string | undefined>(undefined)
    const [loading, setLoading] = React.useState<boolean>(false)
    React.useEffect(() => {
        validateLoggedOut()
    }, [])
    return (
        <main className="bg-white w-[95vw] max-w-4xl mx-auto mt-[25vh] p-8 rounded-md flex flex-col gap-8">
            <h2 className="text-lg md:text-2xl">SignUp</h2>
            {error && <div className="bg-rose-300 p-4 rounded-lg">{error}</div>}
            <form className="flex flex-col gap-4" onSubmit={async (event) => {
                setLoading(true);
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const { email, password, repeatPassword } = Object.fromEntries((formData as any).entries())
                const res = await signup(email, password, repeatPassword);
                res.success ? setError(undefined) : setError(String(res.error));
                setLoading(false);
            }}>
                <Input name="email" placeholder="Email Address" required type="email"/>
                <Input name="password" placeholder="Password" required type="password"/>
                <Input name="repeatPassword" placeholder="Re-enter Password" required type="password"/>
                <Button type="submit" loading={loading}>SignUp</Button>
                <div className="flex justify-center gap-2 pt-2">Already have an account? <Link href="/login" className="text-blue-500">Log In</Link></div>
            </form>
        </main>
    )
}