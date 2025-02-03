import styles from "./areaCard.module.css"
import Image from "next/image";
import { useRouter } from 'next/router';
import React, {useState} from "react";

export default function AreaCard({_width, _height, _service, _titleIcon, _actionIcon, _color, _action, _reaction, _actionId, _reactionId}) {

  const [isHovered, setIsHovered] = useState(false);

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
    transition: 'all 0.3s ease-in-out',
  };

  const router = useRouter();

    const handleClickWithArea = () => {
      return router.push({
        pathname: '/my_area',
        query: {
          action: _actionId,
          reaction: _reactionId,
        },
      });
    };

  return (
    <div style={cardStyle}
         onClick={handleClickWithArea}
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}>
      <div className={styles.areaHeaderContainer}>
        <div className={styles.areaHeader}>
          <div className={styles.areaIcons}>
            <Image src={_titleIcon} alt={""} className={styles.areaIcon} height={32} width={32}/>
            <Image src={_actionIcon} alt={""} className={styles.areaIcon} height={32} width={32}/>
          </div>
        </div>
      </div>

      <div className={styles.areaTextContainer}>
        <div className={styles.areaTextContent}>
          <div className={styles.areaIfThen}>If {_action}</div>
          <div className={styles.areaIfThen}>Then {_reaction}</div>
        </div>
      </div>

      <div className={`${styles.areaCardHoverText} ${isHovered ? styles.areaShowText : ''}`}>
        {'Create this area'} !
      </div>
    </div>
  )
}
