import Link from "next/link"
import Nav from "src/components/parts/Nav"
import { contacts, navs } from "src/contents/nav"
import styles from './index.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div>Logo</div>
        <div>
          {contacts && contacts.map(item => (
            <div key={item.id}><Link href={item.href}>{item.linkText}</Link></div>
          ))}
        </div>
      </div>
      <div className={styles.footerNav}>
        <Nav navs={navs} />
      </div>
      <div className={styles.copyright}>&copy; 2022</div>
    </footer>
  )
}

export default Footer