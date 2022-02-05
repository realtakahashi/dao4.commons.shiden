import { FC } from "react"
import styles from "./Footer.module.scss"

const Footer: FC = () => {

  return (
    <footer className={styles.footer}>
      <a
        href="https://github.com/realtakahashi/dao4.commons.shiden/"
        target="_blank"
        rel="noopener noreferrer"
      >
        dao4.commons.shiden
      </a>
    </footer>
  )
}
export default Footer
