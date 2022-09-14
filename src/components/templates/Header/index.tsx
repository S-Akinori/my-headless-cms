import Link from "next/link";
import Nav from "src/components/parts/Nav";
import { contacts, navs } from "src/contents/nav";
import styles from './index.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
      <div className=""><Link href="/">Logo</Link></div>
      <div className={styles.headerRight}>
        <Nav navs={navs} />
        <div>
          {contacts && contacts.map(item => (
            <div key={item.id}><Link href={item.href}>{item.linkText}</Link></div>
          ))}
        </div>
      </div>
    </header>
  )
}

export default Header;