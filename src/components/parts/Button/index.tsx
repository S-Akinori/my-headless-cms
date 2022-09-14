import Link from "next/link";
import { MouseEventHandler } from "react";
import styles from './index.module.css'

interface Props {
  children: React.ReactNode;
  href?: string
  target?: string
  rel?: string
  color?: 'none' | 'base' | 'main' | 'accent'
  type?: "button" | "submit" | "reset"
  onClick?: MouseEventHandler<HTMLButtonElement>
}
const Button = ({children, color = 'main', href, target, rel, type, onClick}: Props) => {
  const btnStyle = styles.button + ' ' + styles[color]
  return (
    <>
      {href && <Link href={href} target={target} rel={rel}><a className={btnStyle}>{children}</a></Link>}
      {!href && <button className={btnStyle} type={type} onClick={onClick}>{children}</button>}
    </>
  )
}

export default Button