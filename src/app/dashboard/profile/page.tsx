"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProfile } from "@/lib/api";
import {Button} from "@/components/ui/button";
import Link from "next/link";

type User = {
    id: number;
    name: string;
    email: string;
};

export default function ProfilePage() {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.replace("/login");
            return;
        }

        getProfile(token)
            .then((data) => setUser(data))
            .catch(() => {
                localStorage.removeItem("token");
                router.replace("/login");
            });
    }, [router]);

    if (!user) {
        return <p className="p-4">Loading...</p>;
    }

    return (
        <div className="p-6 max-w-xl ">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Profile</h1>
                <Link
                    href="/dashboard/profile/edit"
                    className="inline-block px-4 py-2 bg-slate-200 rounded hover:bg-slate-700 mt-6 hover:text-white"
                >
                    Edit Profile
                </Link>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6 space-y-4 border">
                <div>
                    <p className="text-gray-500 text-sm">Name</p>
                    <p className="text-lg font-semibold">{user.name}</p>
                </div>
                <div>
                    <p className="text-gray-500 text-sm">Email</p>
                    <p className="text-lg font-semibold">{user.email}</p>
                </div>
            </div>
        </div>
    );
}
