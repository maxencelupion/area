import styles from "./Titles.module.css"

export default function Titles({_title, _margin, _color = "#FF0054", _size = "3.5em"}) {
  return (
    <div className={styles.titleStyle} style={{margin: _margin, color: _color, fontSize: _size}}>{_title}</div>
  )
}