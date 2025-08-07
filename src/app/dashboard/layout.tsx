"use client";

import { useRouter } from "next/navigation";
import Sidebar, { SidebarMobile } from "@/components/sidebar";
import { getProfile } from "@/lib/api";
import {useEffect, useState} from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.replace("/login");
            return;
        }

        getProfile(token)
            .then((user) => {
                setUserName(user.name);
            })
            .catch((err) => {
                console.error("Failed to fetch user profile", err);
                router.replace("/login");
            });
    }, [router]);

    return (
        <div className="min-h-screen grid md:grid-cols-[250px_1fr]">
            <Sidebar />

            <div className="flex flex-col">
                <header className="flex items-center justify-between p-4 border-b">
                    <SidebarMobile />
                    <div className="text-sm text-muted-foreground">
                        {userName ? `Welcome, ${userName}` : "Loading..."}
                    </div>
                </header>

                <main className="p-4">{children}</main>
            </div>
        </div>
    );
}
