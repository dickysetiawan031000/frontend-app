"use client"

import { useState } from "react"
import { Item, createItem, updateItem } from "@/lib/api"
import { Button } from "@/components/ui/button"

type ItemFormProps = {
    mode: "create" | "edit"
    initialData?: Item
    onSubmit: (item: Item) => void
    onCancel?: () => void
}

export default function ItemForm({
                                     mode,
                                     initialData,
                                     onSubmit,
                                     onCancel,
                                 }: ItemFormProps) {
    const [name, setName] = useState(initialData?.name || "")
    const [description, setDescription] = useState(initialData?.description || "")
    const [price, setPrice] = useState(initialData?.price || 0)
    const [stock, setStock] = useState(initialData?.stock || 0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const itemData = { name, description, price, stock }

            let savedItem: Item

            if (mode === "edit" && initialData) {
                savedItem = await updateItem(initialData.id, itemData)
            } else {
                savedItem = await createItem(itemData)
            }

            onSubmit(savedItem)
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError("Terjadi kesalahan")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 p-4 border rounded max-w-md"
        >
            <div>
                <label className="block mb-1 font-semibold">Nama</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div>
                <label className="block mb-1 font-semibold">Deskripsi</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border rounded"
                />
            </div>

            <div>
                <label className="block mb-1 font-semibold">Harga</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div>
                <label className="block mb-1 font-semibold">Stok</label>
                <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(parseInt(e.target.value))}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <div className="flex gap-4">
                <Button type="submit" disabled={loading}>
                    {loading ? "Menyimpan..." : mode === "create" ? "Tambah" : "Update"}
                </Button>

                {onCancel && (
                    <Button type="button" onClick={onCancel} variant="secondary">
                        Batal
                    </Button>
                )}
            </div>
        </form>
    )
}
