import React, {useState} from 'react';
import styles from "./profileInfosCard.module.css"
import Titles from "@/pages/Components/Utils/Titles";
import ChangeInfosModals from "@/pages/Components/Modals/ChangeInfosModals";

export default function ProfileInfosCard({_width, _height, _icon, _title = "", _content, setUserInfos, setChangeData, change = true, type = "default"}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div style={{width: _width, height: _height}} className={styles.infosCardContainer}>
        <div className={styles.infosIcon}>{_icon}</div>
        <div className={styles.infosCardText}>
          <Titles _title={_title} _margin={"0 0 15px"} _size={"1.3em"}/>
          <div className={styles.infosCardContent}>{_content}</div>
        </div>
        {change && <div className={styles.infosCardChange} onClick={() => setIsModalOpen(true)}>{`Change your ${_title.toLowerCase()}`}</div>}
      </div>
      {change &&
        <ChangeInfosModals setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} _content={_content} _title={_title}
                          _icon={_icon} setUserInfos={setUserInfos} setChangeData={setChangeData} type={type}/>}
    </div>

  );
}
