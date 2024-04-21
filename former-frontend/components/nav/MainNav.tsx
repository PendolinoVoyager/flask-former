import Link from "next/link";
import classes from "./MainNav.module.css";
import { PATH } from "@/app/paths";
import Image from "next/image";
import NavItem from "./NavItem";
export default function MainNav() {
  return (
    <nav className={classes["main-nav"]}>
      <ul>
        <li className={classes.logo}>
          <Link href={PATH.HOME}>
            <div>
              <Image
                src="/logo.svg"
                alt="logo"
                width={50}
                height={50}
                priority
              />
            </div>
          </Link>
        </li>
        <li className="divider" />
        <li>
          <NavItem href={PATH.ALL_FORMS}>Explore</NavItem>
        </li>
        <li>
          <NavItem href={PATH.CREATE}>Create</NavItem>
        </li>
        <li>
          <NavItem href={PATH.BOOKMARKS}>Bookmarks</NavItem>
        </li>
      </ul>
    </nav>
  );
}
