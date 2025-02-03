import React, { useEffect } from 'react';
import styles from '@/pages/PagesStyles/index.module.css';
import Image from "next/image";
import HeaderContents from "@/pages/Components/Utils/HeaderContents";
import SlidersHomepage from "@/pages/Components/HomepageComponents/SlidersHomepage";
import DownloadMobile from "@/pages/Components/HomepageComponents/DownloadMobile";
import { useRouter } from 'next/router';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const { access_token } = router.query;

    if (access_token) {
      window.localStorage.setItem('access_token', access_token);
      document.cookie = `access_token=${access_token}; path=/; secure; SameSite=Lax`;
      const { pathname } = router;
      router.replace(pathname, undefined, { shallow: true }).then(() => {
        router.reload();
      });
    }
  }, [router, router.query]);

  return (
    <div className={styles.homepageContainer}>
      <div className={styles.homepageHeader}>
        <HeaderContents
          circle={true}
          content={"Managing multiple accounts? No problem. Connect more than one account per service to simplify your automation process."}
          title={'Connect multiple accounts per service'}
        />
        <Image className={styles.headerImage} src={"/assets/homepage/homepageLogo.webp"} alt={``} width={715} height={530} />
      </div>
      <SlidersHomepage />
      <DownloadMobile />
    </div>
  );
}
