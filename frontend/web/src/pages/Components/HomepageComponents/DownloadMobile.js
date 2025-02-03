import React from 'react';
import styles from './DownloadMobile.module.css'
import Titles from "@/pages/Components/Utils/Titles";
import Image from "next/image";
import { MdOutlineFileDownload } from "react-icons/md";

export default function DownloadMobile() {

  return (
    <div className={styles.downloadContainer}>
      <div className={styles.downloadHeader}>
        <div className={styles.downloadHeaderTitle}><Titles _title={"You can also download our mobile application"} /></div>
      </div>
      <div className={styles.downloadContent}>
        <div className={styles.downloadLeft}>
          <div className={styles.downloadLeftTextContainer}>
            <div className={styles.downloadLeftText}>{'If you want to have access to your Areas anywhere, don\'t hesitate to download our mobile application!'}</div>
          </div>
          <a className={styles.downloadLeftButton} href="/assets/apk/client.apk" download>
            <Titles _title={"Download Nexpo mobile"} _size={"2.2em"} />
            <div className={styles.downloadIcon}><MdOutlineFileDownload size={70} color={"#FF0054"} /></div>
          </a>
        </div>
        <div className={styles.downloadRight}>
          <Image src={"/assets/homepage/downloadMobile.webp"} alt={""} width={500} height={500} />
        </div>
      </div>
    </div>
  )
}
