'use client'

import Link from "next/link"
import {usePathname, useRouter} from "next/navigation"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/items", label: "Items" },
    { href: "/dashboard/profile", label: "Profile" },
]

export default function Sidebar() {
    const pathname = usePathname()

    const router = useRouter()

    function handleLogout() {
        localStorage.removeItem("token") // hapus token
        router.push("/login")            // redirect ke halaman login
    }

    return (
        <div className="md:w-64 border-r hidden md:block">
            <div className="p-4">
                <h2 className="text-lg font-bold">My App</h2>
            </div>
            <Separator />
            <ScrollArea className="h-full p-4">
                <nav className="space-y-2">
                    {navItems.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            className={cn(
                                "block px-3 py-2 rounded-md hover:bg-muted transition",
                                pathname === href && "bg-muted font-medium"
                            )}
                        >
                            {label}
                        </Link>
                    ))}
                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 rounded-md hover:bg-muted transition text-red-600"
                    >
                        Logout
                    </button>
                </nav>
            </ScrollArea>
        </div>
    )
}

// Mobile toggle
export function SidebarMobile() {
    const pathname = usePathname()

    const router = useRouter()

    function handleLogout() {
        localStorage.removeItem("token") // hapus token
        router.push("/login")            // redirect ke halaman login
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="w-5 h-5" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
                <div className="p-4 border-b">
                    <h2 className="text-lg font-bold">My App</h2>
                </div>
                <nav className="p-4 space-y-2">
                    {navItems.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            className={cn(
                                "block px-3 py-2 rounded-md hover:bg-muted transition",
                                pathname === href && "bg-muted font-medium"
                            )}
                        >
                            {label}
                        </Link>
                    ))}
                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 rounded-md hover:bg-muted transition text-red-600"
                    >
                        Logout
                    </button>
                </nav>
            </SheetContent>
        </Sheet>
    )
}
