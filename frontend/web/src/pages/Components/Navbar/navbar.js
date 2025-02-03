import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './Navbar.module.css';
import Image from 'next/image';
import { FaUser } from 'react-icons/fa6';
import ConnectionButton from '@/pages/Components/Utils/connectionButton';
import GetServiceConnection from '@/Utils/Request/GetServiceConnection';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const router = useRouter();

  const handleOpenMenu = () => {
    if (window.innerWidth <= 750) {
      setMenuOpen(!menuOpen);
      if (!menuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  };

  const checkTokenValidity = async () => {
    const token = localStorage.getItem('access_token');
    const hasAccessToken = document.cookie.split('; ').some(row => row.startsWith('access_token='));

    if (token && hasAccessToken) {
      try {
        await GetServiceConnection(1);
        setIsConnected(true);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('access_token');
          document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure; SameSite=Lax";
          setIsConnected(false);
        }
      }
    } else {
      localStorage.removeItem('access_token');
      document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure; SameSite=Lax";
      setIsConnected(false);
    }
  };

  useEffect(() => {
    checkTokenValidity();
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem('access_token');
      setIsConnected(!!token);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <nav className={styles.navbar}>
      <Image fetchpriority={"high"} rel={"preload"} loading={"lazy"} src="/assets/navbar/NExPO.webp" alt={""} onClick={() => router.push('/')} width="250" height="90" style={{cursor: 'pointer'}}/>
      <ul className={`${styles.navList} ${menuOpen === true ? styles.openMenu : ''}`}>
        <li className={styles.navItem}>
          <Link rel={"preload"} onClick={handleOpenMenu} href="/" className={`${styles.navLink} ${router.pathname === '/' ? styles.active : ''}`}>
            Home
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link rel={"preload"} onClick={handleOpenMenu} href="/services" className={`${styles.navLink} ${router.pathname.startsWith('/services') ? styles.active : ''}`}>
            Services
          </Link>
        </li>

        {!isConnected ? (
          <>
            <li className={styles.navItem}>
              <Link rel={"preload"} onClick={handleOpenMenu} href="/login"
                    className={`${styles.navLink} ${router.pathname === '/login' ? styles.active : ''}`}>Login</Link>
            </li>
            <li className={styles.navItem}>
              <ConnectionButton
                text={"Sign up"}
                onclick={() => {handleOpenMenu(); return router.push('/signup');}}
                active={router.pathname === '/signup'}
              />
            </li>
          </>
        ) : (
          <>
            <li className={styles.navItem}>
              <Link rel={"preload"} onClick={handleOpenMenu} href="/my_area"
                className={`${styles.navLink} ${router.pathname.startsWith('/my_area') ? styles.active : ''}`}>My Areas</Link>
            </li>
            <li className={styles.navItem}>
              <FaUser
                  className={`${styles.navIconUser} ${['/profile', '/help'].includes(router.pathname) ? styles.activeIcon : ''}`}
                  onClick={() => {
                  handleOpenMenu();
                  return router.push('/profile');
                }} />
            </li>
          </>
        )}
      </ul>
      <Image fetchpriority="low" rel={"preload"} src="/assets/navbar/menu.png" alt={""} className={styles.menuLogo} onClick={handleOpenMenu} width="18"
             height="18"/>
    </nav>
  );
}
