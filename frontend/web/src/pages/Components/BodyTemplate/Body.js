import styles from './Body.module.css'

export default function BodyTemplate({component}) {

  return (
    <div className={styles.bodyContainer}>
      {component}
    </div>
  )
}