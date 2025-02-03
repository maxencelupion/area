import { useEffect, useState } from "react";
import styles from "./areaCardCreated.module.css";
import { useRouter } from "next/router";
import { FaCheckCircle, FaTrash } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";
import { IoCubeOutline, IoDuplicateOutline } from "react-icons/io5";
import GetActionOrReactionById from "@/Utils/Request/GetActionOrReactionById";
import GetServiceId from "@/Utils/Request/GetServiceId";
import IconSvgComponent from "@/pages/Components/Utils/IconSvgOrPng";

function getContrastYIQ(hexcolor) {
  hexcolor = hexcolor.replace("#", "");
  const r = parseInt(hexcolor.substring(0, 2), 16);
  const g = parseInt(hexcolor.substring(2, 4), 16);
  const b = parseInt(hexcolor.substring(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "black" : "white";
}

export default function AreaCardCreated({
  _width,
  _height,
  _name = "",
  _description = "",
  _areaId,
  _actionId,
  _reactionId,
  _active,
  onDeleteArea,
  _color = "#000000",
  _reactionNb,
}) {
  const [actionIcon, setActionIcon] = useState("");
  const [reactionIcon, setReactionIcon] = useState("");
  const [cardColor, setCardColor] = useState("#011627");

  const router = useRouter();
  const textColor = getContrastYIQ(_color);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const actionData = await GetActionOrReactionById(_actionId);
        if (actionData && actionData.serviceId) {
          const actionServiceData = await GetServiceId(actionData.serviceId);
          const actionFrontData = actionServiceData ? JSON.parse(actionServiceData.front_data) : {};
          setActionIcon(actionFrontData.icon || '');
        }

        setCardColor(_color);

        const reactionData = await GetActionOrReactionById(_reactionId);
        if (reactionData && reactionData.serviceId) {
          const reactionServiceData = await GetServiceId(reactionData.serviceId);
          const reactionFrontData = reactionServiceData ? JSON.parse(reactionServiceData.front_data) : {};
          setReactionIcon(reactionFrontData.icon || '');
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [_actionId, _reactionId, _color]);

  const handleClickWithArea = (e) => {
    router.push(`/my_area/${_areaId}`);
  };

  const cardStyle = {
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    cursor: "pointer",
    height: _height,
    maxWidth: _width,
    width: "100%",
    padding: `${_height / 10}px 0`,
    background: `linear-gradient(180deg, ${cardColor}, #011627)`,
    color: textColor,
    transition: "all 0.3s ease-in-out",
  };

  return (
    <div style={cardStyle} onClick={handleClickWithArea}>
      <div className={styles.areaHeaderContainer}>
        <div className={styles.areaIcons}>
          {actionIcon && (
            <IconSvgComponent
              svgPath={actionIcon}
              backgroundColor={cardColor}
            />
          )}
          {reactionIcon && (
            <IconSvgComponent
              svgPath={reactionIcon}
              backgroundColor={cardColor}
            />
          )}
        </div>
        <div className={styles.areaTitle} style={{ color: textColor }}>
          {_name}
        </div>
      </div>

      <div className={styles.areaTextContainer}>
        <p className={styles.areaDescription} style={{ color: textColor }}>
          {_description}
        </p>
      </div>

      <div className={styles.areaFooter}>
        <div className={styles.stats}>
          <IoCubeOutline className={styles.statsIcon} />
          <span>Number of actions: 1</span>
        </div>
        <div className={styles.stats}>
          <IoDuplicateOutline className={styles.statsIcon} />
          <span>Number of reactions: {_reactionNb}</span>
        </div>
        <div className={styles.statusIcons}>
          {_active ? (
            <FaCheckCircle className={styles.ConnectedIcon} />
          ) : (
            <FaRegCircleXmark className={styles.NoConnectedIcon} />
          )}
          <FaTrash
            className={styles.deleteIcon}
            onClick={(e) => {
              e.stopPropagation();
              onDeleteArea(_areaId);
            }}
          />
        </div>
      </div>
    </div>
  );
}
