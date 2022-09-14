import Link from "next/link"
import styles from "./index.module.css"

interface Props {
  navs: {
    id: string
    linkText: string
    href: string
    newTab: boolean
  }[]
}

const Nav = ({navs}: Props) => {
  return (
    <nav className="nav">
      <ul className={styles.navList}>
        {navs && navs.map(item => (
          <li key={item.id} className={styles.navListItem}><Link href={item.href} target={item.newTab ? '_blank' : undefined} rel={item.newTab ? 'noreferrer' : undefined}>{item.linkText}</Link></li>
        ))}
      </ul>
    </nav>
  )
}

export default Nav