// src/app/dashboard/page.tsx
"use client"

import { useEffect, useState } from "react"
import {fetchItems} from "@/lib/api";

export default function DashboardPage() {
    const [totalItems, setTotalItems] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const loadItems = async () => {
            try {
                const items = await fetchItems()
                setTotalItems(items.length)
            } catch (err: any) {
                setError(err.message || "Failed to load items")
            } finally {
                setLoading(false)
            }
        }

        loadItems()
    }, [])

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Welcome to Dashboard</h1>
            <p className="text-gray-700">This is your dashboard content.</p>

            {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                    {error}
                </div>
            )}

            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-gray-600 text-sm">Total Items</h3>
                    <p className="text-3xl font-bold text-gray-900">
                        {loading ? "..." : totalItems}
                    </p>
                </div>
            </div>
        </div>
    )
}
