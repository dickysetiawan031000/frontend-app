"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function RegisterForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            await register(name, email, password);
            router.push("/login"); // redirect setelah sukses
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError("Terjadi kesalahan saat registrasi");
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className={"text-2xl text-center"}>Register</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="name" className={"mb-2"}>Name</Label>
                            <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div>
                            <Label htmlFor="email" className={"mb-2"}>Email</Label>
                            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div>
                            <Label htmlFor="password" className={"mb-2"}>Password</Label>
                            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <Button type="submit" className="w-full">
                            Register
                        </Button>
                    </form>
                </CardContent>
                <CardContent className="text-center text-sm text-gray-500">
                    Sudah punya akun? <a href="/login" className="text-blue-600 hover:underline">Login sekarang</a>
                </CardContent>
            </Card>
        </div>
    );
}
