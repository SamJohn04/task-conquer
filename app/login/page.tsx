'use client';

import { Button, Input } from "@mui/joy";
import Link from "next/link";
import React from "react";
import { login, validateLoggedOut } from "../action/authValidate";

export default function Login() {
    const [error, setError] = React.useState<string | undefined>(undefined)
    const [loading, setLoading] = React.useState<boolean>(false)
    React.useEffect(() => {
        validateLoggedOut()
    }, [])
    return (
        <main className="bg-white w-[95vw] max-w-4xl mx-auto mt-[25vh] p-8 rounded-md flex flex-col gap-8">
            <h2 className="text-lg md:text-2xl">LOGIN</h2>
            {error && <div className="bg-rose-300 p-4 rounded-lg">{error}</div>}
            <form className="flex flex-col gap-4" onSubmit={async (event) => {
                event.preventDefault();
                setLoading(true);
                const formData = new FormData(event.currentTarget);
                const { email, password } = Object.fromEntries((formData as any).entries())
                const res = await login(email, password);
                res.success ? setError(undefined) : setError(String(res.error));
                setLoading(false);
            }}>
                <Input name='email' placeholder="Email Address" required type="email"/>
                <Input name='password' placeholder="Password" required type="password"/>
                <Button type="submit" loading={loading}>Login</Button>
                <div className="flex justify-center gap-2 pt-2">New to Conquer? <Link href="/signup" className="text-blue-500">Sign Up</Link></div>
            </form>
        </main>
    )
}