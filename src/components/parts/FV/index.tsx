import { checkFileType } from "lib/functions/checkFileType"
import Image from "next/image";
import styles from "./index.module.css"

interface Props {
  src: string
  children: React.ReactNode
}

const FV = ({src, children}: Props) => {
  const fileType = checkFileType(src);
  return (
    <div className={styles.fv}>
      <div className={styles.fvBackground}>
        {fileType === 'image' && <Image src={src} layout="fill" objectFit="cover" />}
        {fileType === 'video' && <video src={src} autoPlay />}
      </div>
      <div className={styles.fvContent}>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default FV;