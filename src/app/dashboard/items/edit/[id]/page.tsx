'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ItemForm from "@/app/dashboard/items/ItemForm";
import {fetchItemById, Item} from "@/lib/api";

export default function EditItemPage() {
    const { id } = useParams()
    const router = useRouter()
    const [item, setItem] = useState<Item | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadItem = async () => {
            try {
                if (!id || Array.isArray(id)) throw new Error('ID tidak valid')
                const data = await fetchItemById(Number(id))
                setItem(data)
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message)
                } else {
                    setError('Gagal memuat data item')
                }
            } finally {
                setLoading(false)
            }
        }

        loadItem()
    }, [id])

    const handleUpdate = async (updatedItem: Item) => {
        setItem(updatedItem)
        router.push('/dashboard/items')
    }

    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>Edit Item</CardTitle>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <p>Memuat...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : item ? (
                    <ItemForm
                        mode="edit"
                        initialData={item}
                        onSubmit={handleUpdate}
                    />
                ) : (
                    <p>Item tidak ditemukan.</p>
                )}
            </CardContent>
        </Card>
    )
}
