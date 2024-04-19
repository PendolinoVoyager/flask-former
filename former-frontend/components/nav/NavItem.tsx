'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import classes from './MainNav.module.css'
interface INavItemProps {
    href: string,
    children: JSX.Element | string

}
export default function NavItem({href, children }: INavItemProps) {
    const path = usePathname();
    return (
        <Link href={href} className={href === path ? classes.active : ""}>{children}</Link>
    )
}