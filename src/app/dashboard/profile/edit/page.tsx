"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProfile, updateProfile } from "@/lib/api";
import {Button} from "@/components/ui/button";

export default function EditProfilePage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.replace("/login");
            return;
        }

        getProfile(token)
            .then((user) => {
                setName(user.name);
                setEmail(user.email);
            })
            .catch(() => {
                localStorage.removeItem("token");
                router.replace("/login");
            });
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) return;

        if (newPassword || confirmNewPassword || oldPassword) {
            if (!oldPassword) {
                setError("Old password is required to change password.");
                return;
            }
            if (newPassword !== confirmNewPassword) {
                setError("New passwords do not match.");
                return;
            }
        }

        try {
            await updateProfile(token, {
                name,
                email,
                ...(newPassword && { old_password: oldPassword, new_password: newPassword }),
            });
            router.push("/dashboard/profile");
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError("Failed to update profile")
            }
        }

    };

    return (
        <div className="p-4 max-w-md">
            <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
            {error && <p className="text-red-600 mb-2">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium">Name</label>
                    <input
                        className="w-full border px-3 py-2 rounded"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium">Email</label>
                    <input
                        type="email"
                        className="w-full border px-3 py-2 rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                {/* Optional: Password Change Section */}
                <div className="pt-4 border-t">
                    <h2 className="text-lg font-semibold mb-2">Change Password</h2>

                    <div>
                        <label className="block font-medium">Old Password</label>
                        <input
                            type="password"
                            className="w-full border px-3 py-2 rounded"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block font-medium">New Password</label>
                        <input
                            type="password"
                            className="w-full border px-3 py-2 rounded"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Confirm New Password</label>
                        <input
                            type="password"
                            className="w-full border px-3 py-2 rounded"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                        />
                    </div>
                </div>

                <Button
                    type="submit"
                    className="text-white px-4 py-2 rounded hover:bg-slate-500 transition-colors"
                >
                    Save Changes
                </Button>
            </form>
        </div>
    );
}
