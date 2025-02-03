import styles from "./HeaderContents.module.css"
import Titles from "./Titles"

export default function HeaderContents({circle, title, content}) {
  return (
    <div className={styles.headerText}>
      <div className={styles.headerTop}>
        {circle === true ? <div className={styles.circle}></div> : ''}
        <Titles _title={title} />
      </div>
      <div className={styles.headerContent}>
        {content}
      </div>
    </div>
  )
}