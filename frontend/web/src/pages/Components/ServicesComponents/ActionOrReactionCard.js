import styles from "./actionOrReactionCard.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { IoCubeOutline, IoDuplicateOutline } from "react-icons/io5";

export default function ActionOrReactionCard({
  _width,
  _height,
  _service,
  _titleIcon,
  _color,
  _actionOrReaction,
  type,
  id
}) {
  const cardStyle = {
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    cursor: "pointer",
    height: _height,
    maxWidth: _width,
    width: "100%",
    padding: `20px 0`,
    background: `linear-gradient(180deg, ${_color}, #011627)`,
    transition: "all 0.3s ease-in-out",
  };

  const router = useRouter();

  const handleClick = () => {
    const queryParam = type === 'action' ? { action: id } : { reaction: id };
    router.push({ pathname: '/my_area', query: queryParam });
  };

  return (
    <div style={cardStyle} onClick={handleClick}>
      <div className={styles.headerContainer}>
        <div className={styles.header}>
          <div className={styles.icons}>
            {type === 'action' ? (
              <IoCubeOutline className={styles.icon} size={40} color="#FDFFFC"/>
            ) : (
              <IoDuplicateOutline className={styles.icon} size={40} color="#FDFFFC"/>
            )}
            <Image src={_titleIcon} alt={""} className={styles.icon} height={40} width={40} />
          </div>
          <div className={styles.title}>{_service}</div>
        </div>
      </div>

      <div className={styles.textContainer}>
        <div className={styles.textContent}>{_actionOrReaction}</div>
      </div>
    </div>
  );
}
