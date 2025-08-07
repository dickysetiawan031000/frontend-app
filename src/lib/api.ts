// src/utils/api.ts
export interface Item {
    id: number
    name: string
    description: string
    price: number
    stock: number
}

export async function fetchItems(): Promise<Item[]> {
    const token = localStorage.getItem('token')
    if (!token) {
        throw new Error('Unauthorized: Token not found')
    }

    const res = await fetch('http://localhost:8080/api/items', {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })

    const data = await res.json()

    if (!res.ok) {
        throw new Error(data?.error || 'Failed to fetch items')
    }

    return data?.data ?? []
}

export async function createItem(itemData: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>): Promise<Item> {
    const token = localStorage.getItem('token')
    const res = await fetch('http://localhost:8080/api/items', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(itemData),
    })

    if (!res.ok) {
        const data = await res.json()
        throw new Error(data?.error || 'Gagal membuat item')
    }

    const data = await res.json()
    return data.data
}

export async function updateItem(id: number, itemData: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>): Promise<Item> {
    const token = localStorage.getItem('token')
    const res = await fetch(`http://localhost:8080/api/items/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(itemData),
    })

    if (!res.ok) {
        const data = await res.json()
        throw new Error(data?.error || 'Gagal mengupdate item')
    }

    const data = await res.json()
    return data.data
}

export async function fetchItemById(id: number): Promise<Item> {
    const token = localStorage.getItem('token')
    const res = await fetch(`http://localhost:8080/api/items/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    })

    const data = await res.json()

    if (!res.ok) {
        throw new Error(data?.error || 'Gagal mengambil data item')
    }

    return data.data
}

export async function deleteItem(id: number) {
    const token = localStorage.getItem('token')
    const res = await fetch(`http://localhost:8080/api/items/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if (!res.ok) throw new Error('Gagal menghapus item')
}

import axios from "axios";

export async function getProfile(token: string) {
    try {
        const response = await axios.get("http://localhost:8080/api/profile", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        throw new Error("Failed to fetch profile");
    }
}

export async function updateProfile(token: string, data: { name: string; email: string }) {
    const res = await fetch("http://localhost:8080/api/profile", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const errorData = await res.json();
        console.log("Error data:", errorData);
        throw new Error(errorData.error || "Failed to update profile");
    }

    return await res.json();
}



