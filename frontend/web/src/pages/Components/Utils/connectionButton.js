import styles from './connectionButton.module.css';

export default function ConnectionButton({ text, onclick, active }) {
  return (
    <div onClick={onclick} className={`${styles.signUp} ${active ? styles.active : ''}`}>
      {text}
    </div>
  );
}