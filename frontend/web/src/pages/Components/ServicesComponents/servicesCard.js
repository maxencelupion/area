import styles from "./servicesCard.module.css"
import { IoIosAdd } from "react-icons/io";
import Image from "next/image";
import {useState} from "react";
import React from 'react';
import { useRouter } from 'next/router';
import {capitalizeFirstLetter} from "@/Utils/Utils";

export default function ServicesCard({_color, _height, _width, _icon, _title = "", _iconSize = 100, _titleSize = "2.5em"}) {

  const [isHovered, setIsHovered] = useState(false);

  const cardStyle = {
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    cursor: "pointer",
    height: _height,
    maxWidth: _width,
    width: "100%",
    padding: _height > 200 ? `20px 0` : `${_height / 10}px 0`,
    background: `linear-gradient(180deg, ${_color}, #011627)`,
    transition: 'all 0.3s ease-in-out',
  };

  const cardIcon = {
    marginTop: _height > 300 ? 50 : 0,
  }

  const router = useRouter();
  const handleClick = (_title) => {
    router.push(`/services/${_title}`);
  };

  return (
    <div
      style={cardStyle}
      className={styles.serviceCardContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => handleClick(_title)}>
      <div style={cardIcon}>
        <Image style={{width: _iconSize, height: _iconSize, marginBottom: _height / 15}} src={_icon} alt={""} width={_iconSize} height={_iconSize}/>
      </div>

      <div style={{fontSize: _titleSize}} className={styles.cardTitle}>{capitalizeFirstLetter(_title)}</div>

      <div className={styles.cardAdd} style={{ opacity: isHovered ? 0 : 1, transition: 'opacity 0.3s ease', bottom: _height > 300 ? '25%' : '15%'}}>
        <IoIosAdd color={"white"} style={{ fontSize: '2em' }} />
      </div>

      {_width > 300 && _height > 300 &&
        <div className={`${styles.cardHoverText} ${isHovered ? styles.showText : ''}`}>
          Discover all actions / reactions for {_title} !
        </div>
      }

    </div>
  )
}
