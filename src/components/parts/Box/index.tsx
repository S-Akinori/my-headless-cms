import styles from './index.module.css'
interface Props {
  children: React.ReactNode
}
const Box = ({children}: Props) => {
  return (
    <div className={styles.box}>{children}</div>
  )
}

export default Box