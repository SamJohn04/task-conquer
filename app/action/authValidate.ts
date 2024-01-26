'use server';

import { auth } from "@/app/firebase/firebase";
import { FirebaseError } from "firebase/app";
import { User, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { redirect } from "next/navigation";

export async function isLoggedIn() {
    return auth.currentUser !== null;
}

export async function getUserName() {
    return auth.currentUser?.displayName || auth.currentUser?.email?.split('@')[0] || 'User';
}

export async function getUser() {
    return auth.currentUser;
}

export async function login(email: string, password: string): Promise<{success: true, user: User} | {success: false, error: unknown}> {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password)
        const user = result.user
        redirect('/dashboard')
    } catch (error) {
        if(error instanceof FirebaseError) {
            let errorMessage;

            if(error.code === 'auth/invalid-credential') {
                errorMessage = 'Invalid credentials'
            } else if(error.code === 'auth/user-disabled') {
                errorMessage = 'User disabled'
            } else if(error.code === 'auth/user-not-found') {
                errorMessage = 'User not found'
            } else if(error.code === 'auth/wrong-password') {
                errorMessage = 'Wrong password'
            } else {
                errorMessage = error.message
            }

            return {
                success: false,
                error: errorMessage
            }
        };
        return {
            success: false,
            error: 'Sign up failed',
        };
    }
}

export async function logout() {
    await auth.signOut();
    redirect('/login');
}

export async function signup(email: string, password: string, repeatPassword: string) {
    try {
        if (password !== repeatPassword) {
            return {
                success: false,
                error: 'Passwords do not match'
            }
        }
        const result = await createUserWithEmailAndPassword(auth, email, password)
        const user = result.user
        return {
          success: true,
          user,
        }
    } catch (error) {
        if(error instanceof FirebaseError) {
            let errorMessage;
            if(error.code === 'auth/email-already-in-use') {
                errorMessage = 'Email already in use'
            } else if(error.code === 'auth/invalid-email') {
                errorMessage = 'Invalid email'
            } else if(error.code === 'auth/weak-password') {
                errorMessage = 'Weak password'
            } else {
                errorMessage = error.message
            }

            return {
            success: false,
            error: errorMessage
            }
        };
        return {
          success: false,
          error: 'Sign up failed'
        }
    }
}

export async function validateLoggedIn() {
    if(!await isLoggedIn()) {
        redirect('/login')
    }
}

export async function validateLoggedOut() {
    if(await isLoggedIn()) {
        redirect('/dashboard')
    }
}