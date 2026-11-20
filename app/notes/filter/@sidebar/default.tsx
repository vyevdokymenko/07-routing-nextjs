import css from "@/app/notes/filter/@sidebar/SidebarNotes.module.css";
import { noteTags } from "@/types/note";
import Link from "next/link";

function Sidebar() {
  return (
    <ul className={css.menuList}>
      {/* список тегів */}
      <li className={css.menuItem}>
        <a href={`/notes/filter/all`} className={css.menuLink}>
          All notes
        </a>
      </li>
      {noteTags.map((tag) => (
        <li className={css.menuItem} key={tag}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Sidebar;
