"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const menuItems = [
    {
        title: "About",
        href: "/about",
        description: "Learn more about our mission and vision."
    },
    {
        title: "Docs",
        href: "/docs",
        description: "Documentation and guides for using our platform."
    },
    {
        title: "Blog",
        href: "/blog",
        description: "Latest updates and articles about carbon credits."
    },
    {
        title: "Contact",
        href: "/contact",
        description: "Get in touch with our team."
    }
]

export function NavigationMenuDemo() {
    return (
        <NavigationMenu className="w-full pt-0 pb-4">
            <NavigationMenuList className="flex items-center w-full max-w-6xl mx-auto px-6 gap-8">
                <NavigationMenuItem className="mr-2">
                    <NavigationMenuTrigger className="h-[100px] flex items-center p-0">
                        <img
                            src="./src/assets/unicarbon_logo_header.png"
                            width={150}
                            height={100}
                            alt="Unicarbon Logo"
                        />
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-6 md:w-[500px] lg:w-[600px]">
                            {menuItems.map((item) => (
                                <ListItem
                                    key={item.title}
                                    title={item.title}
                                    href={item.href}
                                >
                                    {item.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem className="mx-1">
                    <NavigationMenuTrigger className="h-[100px] flex items-center p-0  text-xl">Trade</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-6">
                            <ListItem href="/trade/buy" title="Buy Carbon Credits">
                                Purchase carbon credits from verified sources.
                            </ListItem>
                            <ListItem href="/trade/sell" title="Sell Carbon Credits">
                                List your carbon credits for sale.
                            </ListItem>
                            <ListItem href="/trade/market" title="Market Overview">
                                View current market trends and prices.
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem className="mx-1">
                    <NavigationMenuTrigger className="h-[100px] flex items-center p-0  text-xl">Pool</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-6">
                            <ListItem href="/pool/active" title="Active Pools">
                                View and join active carbon credit pools.
                            </ListItem>
                            <ListItem href="/pool/create" title="Create Pool">
                                Start a new carbon credit pool.
                            </ListItem>
                            <ListItem href="/pool/my-pools" title="My Pools">
                                Manage your pool investments.
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <div className="flex-1 flex justify-center px-8">
                    <div className="w-64">
                        <Input 
                            type="search" 
                            placeholder="Search..." 
                            className="w-full rounded-lg"
                        />
                    </div>
                </div>

                <div className="flex items-center ml-4">
                    <Button 
                        variant="default" 
                        className="rounded-lg bg-[#097833] text-white hover:bg-[#097833]/90 px-6"
                    >
                        Connect Wallet
                    </Button>
                </div>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a"> & { title: string }
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
