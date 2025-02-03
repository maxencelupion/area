import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaArrowLeft } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "@/pages/PagesStyles/area_template.module.css";
import GetAreaById from "@/Utils/Request/GetAreaById";
import PutChangeAreaStatus from "@/Utils/Request/PutChangeAreaStatus";
import ActionOrReactionCreated from "@/pages/Components/AreaComponents/actionOrReactionCreated";

function getContrastYIQ(hexcolor) {
  hexcolor = hexcolor.replace("#", "");
  const r = parseInt(hexcolor.substring(0, 2), 16);
  const g = parseInt(hexcolor.substring(2, 4), 16);
  const b = parseInt(hexcolor.substring(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "black" : "white";
}

const AreaTemplate = () => {
  const router = useRouter();
  const { id } = router.query;

  const [area, setArea] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [textColor, setTextColor] = useState("white");

  useEffect(() => {
    if (id) {
      const fetchArea = async () => {
        try {
          const areaData = await GetAreaById(id);
          setArea(areaData);
          setIsConnected(areaData.active);
          setTextColor(getContrastYIQ(areaData.color));
          document.documentElement.style.setProperty(
            "--connected-color",
            areaData.color
          );
        } catch (error) {
          console.error("Error fetching area data:", error);
          toast.error("Failed to load area data");
        }
      };
      fetchArea();
    }
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const toggleConnection = async () => {
    try {
      await PutChangeAreaStatus(id);
      setIsConnected((prev) => !prev);
      toast.success(
        `Area ${isConnected ? "desactivated" : "activated"} successfully`
      );
    } catch (error) {
      console.error("Error changing area status:", error);
      toast.error("Failed to change the status of the area");
    }
  };

  if (!area) return <div>Loading...</div>;

  const { name, description, last_executed, color, action, areaReaction } =
    area;

  return (
    <div
      className={styles.pageContainer}
      style={{
        background: `linear-gradient(180deg, ${color} 45%, #011627 40%)`,
      }}
    >
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
      />
      <div className={styles.header}>
        <button
          className={styles.backButton}
          onClick={() => router.back()}
          style={{ color: textColor, border: `3px, ${textColor}, solid` }}
        >
          <FaArrowLeft style={{ color: textColor }} /> Back
        </button>
      </div>

      <div className={styles.areaInfo}>
        <h1 className={styles.areaName} style={{ color: textColor }}>
          {name}
        </h1>
        <p className={styles.areaDescription} style={{ color: textColor }}>
          {description}
        </p>
        <p className={styles.executionLabel} style={{ color: textColor }}>
          Last Execution: {formatDate(last_executed)}
        </p>

        <div className={styles.connectButton} onClick={toggleConnection}>
          <div
            className={`${styles.serviceIcon} ${
              isConnected ? styles.connected : styles.notConnected
            }`}
          />
          <div className={styles.connectText}>
            {isConnected ? "Activated" : "Desactivated"}
          </div>
        </div>
      </div>

      <div className={styles.cardsContainer}>
        <ActionOrReactionCreated item={action} type="action" />
        {areaReaction.map((reaction, index) => (
          <ActionOrReactionCreated key={index} item={reaction.element} type="reaction" />
        ))}
      </div>
    </div>
  );
};

export default AreaTemplate;
