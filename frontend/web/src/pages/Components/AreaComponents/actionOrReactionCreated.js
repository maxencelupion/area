import React from 'react';
import { IoCubeOutline, IoDuplicateOutline } from "react-icons/io5";
import styles from './actionOrReactionCreated.module.css'

const ActionOrReactionCreated = ({ item, type }) => {

  if (!item || !item.service || !item.service.front_data) {
    return <div>Loading...</div>;
  }

  const { name, description, service } = item;
  let color;

  try {
    color = JSON.parse(service.front_data).color;
  } catch (error) {
    console.error('Invalid front_data:', error);
    color = '#000';
  }

  const Icon = type === "action" ? IoCubeOutline : IoDuplicateOutline;

  return (
    <div
      className={styles.cardContainer}
      style={{
        background: `linear-gradient(135deg, ${color} 0%, #1b2b34 100%)`,
      }}
    >
      <div className={styles.iconContainer}>
        <Icon size={40} color="#FDFFFC" />
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardTitle}>{name}</div>
        <div className={styles.cardDescription}>{description}</div>
      </div>
    </div>
  );
};

export default ActionOrReactionCreated;
