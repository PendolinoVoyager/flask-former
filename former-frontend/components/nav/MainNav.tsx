import Link from "next/link";
import classes from "./MainNav.module.css";
import { PATH } from "@/app/paths";
export default function MainNav() {
  return (
    <nav className={classes["main-nav"]}>
      <ul>
        <li>
          <Link href={PATH.HOME}>
            <div>
              <p>LOGO/HOME</p>
            </div>
          </Link>
        </li>
        <li className="divider" />
        <li>
          <Link href={PATH.ALL_FORMS}>Explore</Link>
        </li>
        <li>
          <Link href={PATH.CREATE}>Create</Link>
        </li>
        <li>
          <Link href={PATH.BOOKMARKS}>Bookmarks</Link>
        </li>
      </ul>
    </nav>
  );
}
