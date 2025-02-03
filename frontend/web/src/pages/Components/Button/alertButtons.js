import styles from "./alertButtons.module.css"

export default function AlertButtons({ onPress, content, color }) {
  const alertButtonStyle = {
    width: "auto",
    height: "auto",
    backgroundColor: color,
    padding: "15px 20px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.3s ease-out",
  };

  return (
    <div onClick={onPress} style={alertButtonStyle} className={styles.alertButtonContainer}>
      <div className={styles.alertButtonText}>{content}</div>
    </div>
  );
}
