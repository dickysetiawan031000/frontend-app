"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-8 gap-6">
            <h1 className="text-3xl font-bold text-center">Selamat Datang 👋</h1>

            <p className="text-center text-muted-foreground max-w-md">
                Ini adalah aplikasi sederhana saya. Silakan login jika sudah punya akun, atau daftar untuk mulai menggunakan aplikasi.
            </p>

            <div className="flex gap-4">
                <Button onClick={() => router.push("/login")}>Login</Button>
                <Button variant="outline" onClick={() => router.push("/register")}>
                    Register
                </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground mt-6">
                Dibuat oleh{" "}
                <a
                    href="https://github.com/dickysetiawan031000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-primary"
                >
                    Dicky Setiawan
                </a>{" "}
                |{" "}
                <a
                    href="https://linkedin.com/in/dickysetiawan03"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-primary"
                >
                    LinkedIn
                </a>
            </div>
        </main>
    );
}
