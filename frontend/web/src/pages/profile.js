import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import styles from '@/pages/PagesStyles/profile.module.css';
import Titles from "@/pages/Components/Utils/Titles";
import ConnectionButton from "@/pages/Components/Utils/connectionButton";
import SearchBar from "@/pages/Components/Utils/searchBar";
import ServicesCard from "@/pages/Components/ServicesComponents/servicesCard";
import ProfileInfosCard from "@/pages/Components/ProfileComponents/profileInfosCard";
import { FaUser } from "react-icons/fa6";
import { FaAddressCard } from "react-icons/fa";
import { MdMarkEmailUnread } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdLanguage } from "react-icons/md";
import { IoHelpCircle } from "react-icons/io5";

import {profileRequest, connectedServicesRequest} from "@/Utils/Request/Request";
import {getServiceColor, getServiceIcon} from "@/Utils/getServiceData";

import putChangeProfileInfos from "@/Utils/Request/PutRequests";

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import dynamic from 'next/dynamic';
import 'simplebar-react/dist/simplebar.min.css';
const SimpleBar = dynamic(() => import('simplebar-react'), { ssr: false });

export default function Profile() {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [userInfos, setUserInfos] = useState({});
  const [services, setServices] = useState([]);
  const [changeData, setChangeData] = useState(false);

  useEffect(() => {
    profileRequest().then(response => {
      setUserInfos(response.data)
    }).catch(error => {
      console.error('Error: ', error);
    });
    connectedServicesRequest().then(response => {
      setServices(response.data)
    }).catch(error => {
      console.error('Error: ', error);
    });
  }, []);

  useEffect(() => {
    if (changeData && userInfos) {
      setChangeData(false);
      putChangeProfileInfos(userInfos);
    }
  }, [changeData, userInfos]);

  const filteredServicesCards = services.filter(service =>
    service.name.toLowerCase().startsWith(searchInput.toLowerCase())
  );


  const handleSignOut = () => {
    localStorage.removeItem('access_token');
    sessionStorage.clear();
    document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure; SameSite=Lax";
    const event = new Event('storage');
    window.dispatchEvent(event);
    return router.push('/login');
  };

  if (!userInfos || !services) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress size={60} color="primary" />
      </Box>
    );
  }

  return (
    <div className={styles.profileContainer}>
      <ToastContainer position="top-center" autoClose={1500} hideProgressBar={false} />
      <div className={styles.profileHeader}>
        <Titles _title={'Your Account'}/>
        <div className={styles.profileHeaderButtons}>
          <div className={styles.profileHelpButton} onClick={() => router.push(`/help`)}>
            <div className={styles.profileHeaderText}>HELP</div>
            <IoHelpCircle color={"white"} size={30}/>
          </div>
          <ConnectionButton text={'Sign Out'} active={false} onclick={handleSignOut}/>
        </div>

      </div>
      <div className={styles.profileContent}>
        <div className={styles.profileServicesContainer}>
          <Titles _title={"Your Services"} _color={"white"} _size={"3em"}/>
          <div style={{marginBottom: "20px"}}>
            <SearchBar setSearchInput={setSearchInput}/>
          </div>
          <div className={styles.profileServicesCard}>
            {filteredServicesCards.map((service, index) => (
              <ServicesCard
                key={index}
                _color={getServiceColor(service.front_data)}
                _height={150}
                _width={150}
                _icon={getServiceIcon(service.front_data)}
                _title={service.name}
                _iconSize={50}
                _titleSize={"1.5em"}
              />
            ))}
          </div>
        </div>
        <SimpleBar
          style={{width: 900, height: 580}}
          renderThumbVertical={({style, ...props}) => (
            <div
              {...props}
              style={{
                ...style,
                backgroundColor: '#FF0054',
                borderRadius: '10px',
              }}
            />
          )}
          renderTrackVertical={({style, ...props}) => (
            <div
              {...props}
              style={{
                ...style,
                backgroundColor: '#011627',
                borderRadius: '10px',
                width: '10px',
              }}
            />
          )}
        >
          <div className={styles.profileInfos}>
            <div className={styles.profileInfosHeader}>
              <Titles _title={"Personal information"} _color={"white"} _size={"3em"} _margin={"0 0 15px"}/>
              <div className={styles.profileInfosHeaderText}>{'all your personal details are displayed here.'}</div>
            </div>
            <div className={styles.profileCardList}>
              <ProfileInfosCard _title={"Surname"} _height={"150px"} _width={"350px"} setUserInfos={setUserInfos}
                                setChangeData={setChangeData} _content={userInfos.surname}
                                _icon={<FaUser size={100} color={"#FF0054"}/>}/>
              <ProfileInfosCard _title={"Lastname"} _height={"150px"} _width={"350px"} setUserInfos={setUserInfos}
                                setChangeData={setChangeData} _content={userInfos.lastname}
                                _icon={<FaAddressCard size={100} color={"#FF0054"}/>}/>
              <ProfileInfosCard _title={"Email"} _height={"150px"} _width={"350px"} setUserInfos={setUserInfos}
                                setChangeData={setChangeData} _content={userInfos.email}
                                _icon={<MdMarkEmailUnread size={100} color={"#FF0054"}/>} change={false}/>
              {!userInfos.createdWithService &&
                <ProfileInfosCard _title={"Password"} _height={"150px"} _width={"350px"} setUserInfos={setUserInfos}
                                  setChangeData={setChangeData} _content={"**********"}
                                  _icon={<RiLockPasswordLine size={100} color={"#FF0054"}/>} type={"password"}/>}
              <ProfileInfosCard _title={"Language"} _height={"150px"} _width={"350px"} setUserInfos={setUserInfos}
                                setChangeData={setChangeData} _content={"English"}
                                _icon={<MdLanguage size={100} color={"#FF0054"}/>} change={false}/>
            </div>
          </div>
        </SimpleBar>
      </div>
    </div>
  )
};
