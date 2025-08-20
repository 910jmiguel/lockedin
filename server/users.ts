"use server";

import { auth } from '@/lib/auth';

// dummy logins
export const signIn = async(email: string, password: string) => {
    try {
        await auth.api.signInEmail({
            body: {
                email,
                password
            }
        })

        return {
            success: true,
            message: "Signed in successfully."
        }
    } catch (error) {
        const e = error as Error;

        return {
            success: false,
            message: { error: e.message || "An unknown error occured." }
        }
    }
}

export const signUp = async() => {
    await auth.api.signUpEmail({
        body: {
            email: "user@test.com",
            password: "password123",
            name: "Test User"
        }
    })
}
