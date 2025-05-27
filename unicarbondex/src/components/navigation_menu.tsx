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
import { Link } from 'react-router-dom'

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
        <NavigationMenu className="max-w-8xl  justify-baseline pb-4 px-4">
            <NavigationMenuList className="flex max-w-full   px-4 gap-1 ">
                {/* Logo - Simple link without dropdown */}
                <NavigationMenuItem className="mr-2 w-full">
                    <NavigationMenuLink asChild>
                        <Link to="/" className="h-[100px] flex items-center  justify-center p-0">
                            <img
                                src="/src/assets/unicarbon_logo_header.png"
                                width={150}
                                height={100}
                                alt="Unicarbon Logo"
                                className="object-contain"
                            />
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Trade - Simple link */}
                <NavigationMenuItem className="mx-1 justify-center  ">
                    <NavigationMenuLink asChild>
                        <Link 
                            to="/swap" 
                            className=" flex items-center   text-xl hover:text-gray-600 transition-colors"
                        >
                            Trade
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Pool - Could be a dropdown or simple link */}
                <NavigationMenuItem className="mx-1">
                    <NavigationMenuLink asChild>
                        <Link 
                            to="/pool" 
                            className=" flex items-center p-0 text-xl hover:text-gray-600 transition-colors"
                        >
                            Pool
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

           

              
               
            </NavigationMenuList>
                 {/* Search bar - centered */}
                 <div className="flex flex-grow  justify-center">
                    <div className="w-64">
                        <Input 
                            type="search"
                            placeholder="Search..."
                            className="w-full rounded-lg"
                        />
                    </div>
                </div>
  {/* Connect Wallet button */}
            <div className="flex flex-grow justify-end-safe ">
                    <Button 
                        variant="default"
                        className="rounded-lg bg-[#097833] text-white hover:bg-[#097833]/90 px-6"
                    >
                        Connect Wallet
                    </Button>
                </div>
        </NavigationMenu>
    )
}

// Helper component for dropdown list items
const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a"> & { title: string; href: string }
>(({ className, title, children, href, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    ref={ref}
                    to={href}
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
                </Link>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"