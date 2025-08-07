
export async function login(email: string, password: string) {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

    const res = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (!res.ok) {
        throw new Error(data.error || "Login failed")
    }

    localStorage.setItem("token", data.data.token)
}


export async function register(name: string, email: string, password: string) {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

    const res = await fetch(`${apiUrl}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Register failed");

}

// src/lib/auth.ts
export function authHeader() {
    const token = localStorage.getItem('token');
    return {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
}


