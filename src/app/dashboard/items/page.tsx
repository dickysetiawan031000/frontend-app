'use client'

import { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { fetchItems, Item, deleteItem } from '@/lib/api'
import ItemForm from './ItemForm'

export default function ItemsPage() {
    const [items, setItems] = useState<Item[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [showForm, setShowForm] = useState(false)
    const [editItem, setEditItem] = useState<Item | null>(null)

    const loadItems = async () => {
        try {
            const items = await fetchItems()
            setItems(items)
        } catch (err: any) {
            console.error(err)
            setError(err.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadItems()
    }, [])

    const handleDelete = async (id: number) => {
        const confirmed = confirm('Yakin ingin menghapus item ini?')
        if (!confirmed) return

        try {
            await deleteItem(id)
            setItems(items.filter(item => item.id !== id))
        } catch (err: any) {
            alert(err.message || 'Gagal menghapus item')
        }
    }

    return (
        <Card className="mt-4">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Item List</CardTitle>
                <Button
                    onClick={() => {
                        setEditItem(null)
                        setShowForm(true)
                    }}
                >
                    + Create Item
                </Button>
            </CardHeader>
            <CardContent>
                {showForm && (
                    <ItemForm
                        mode={editItem ? 'edit' : 'create'}
                        initialData={editItem || undefined}
                        onSubmit={(submittedItem) => {
                            if (editItem) {
                                setItems(items.map(item => item.id === submittedItem.id ? submittedItem : item))
                            } else {
                                setItems([...items, submittedItem])
                            }
                            setEditItem(null)
                            setShowForm(false)
                        }}
                        onCancel={() => {
                            setEditItem(null)
                            setShowForm(false)
                        }}
                    />
                )}
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : items.length === 0 ? (
                    <p>Tidak ada item yang tersedia.</p>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nama</TableHead>
                                <TableHead>Deskripsi</TableHead>
                                <TableHead>Harga</TableHead>
                                <TableHead>Stok</TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.description}</TableCell>
                                    <TableCell>Rp {item.price.toLocaleString()}</TableCell>
                                    <TableCell>{item.stock}</TableCell>
                                    <TableCell className="space-x-2">
                                        <Button
                                            variant="outline"
                                            onClick={() => {
                                                setEditItem(item)
                                                setShowForm(true)
                                            }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    )
}
