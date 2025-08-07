import axios from "axios"

export interface Item {
    id: number
    name: string
    description: string
    price: number
    stock: number
}

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

function getToken(): string {
    const token = localStorage.getItem("token")
    if (!token) throw new Error("Unauthorized: Token not found")
    return token
}

export async function fetchItems(): Promise<Item[]> {
    const token = getToken()
    const res = await fetch(`${API_BASE_URL}/api/items`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data?.error || "Failed to fetch items")
    return data?.data ?? []
}

export async function createItem(itemData: Omit<Item, "id">): Promise<Item> {
    const token = getToken()
    const res = await fetch(`${API_BASE_URL}/api/items`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(itemData),
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data?.error || "Gagal membuat item")
    return data.data
}

export async function updateItem(
    id: number,
    itemData: Omit<Item, "id">
): Promise<Item> {
    const token = getToken()
    const res = await fetch(`${API_BASE_URL}/api/items/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(itemData),
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data?.error || "Gagal mengupdate item")
    return data.data
}

export async function fetchItemById(id: number): Promise<Item> {
    const token = getToken()
    const res = await fetch(`${API_BASE_URL}/api/items/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data?.error || "Gagal mengambil data item")
    return data.data
}

export async function deleteItem(id: number): Promise<void> {
    const token = getToken()
    const res = await fetch(`${API_BASE_URL}/api/items/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if (!res.ok) throw new Error("Gagal menghapus item")
}

export async function getProfile(token: string) {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data.data
    } catch {
        throw new Error("Failed to fetch profile")
    }
}

export async function updateProfile(token: string, data: { name: string; email: string }) {
    const res = await fetch(`${API_BASE_URL}/api/profile`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    })

    const responseData = await res.json()
    if (!res.ok) throw new Error(responseData.error || "Failed to update profile")
    return responseData
}
