import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import styles from '@/pages/PagesStyles/service_template.module.css';
import Titles from "@/pages/Components/Utils/Titles";
import SearchBar from "@/pages/Components/Utils/searchBar";
import Image from "next/image";
import GetServiceId from "@/Utils/Request/GetServiceId";
import GetServiceConnection from "@/Utils/Request/GetServiceConnection";
import GetServiceIdActions from "@/Utils/Request/GetServiceIdActions";
import GetServiceIdReactions from "@/Utils/Request/GetServiceIdReactions";
import ActionOrReactionCard from "@/pages/Components/ServicesComponents/ActionOrReactionCard.js";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import DeleteServiceById from "@/Utils/Request/DeleteServiceById";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MySwal = withReactContent(Swal);

const ServicePage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [serviceData, setServiceData] = useState(null);
  const [userConnection, setUserConnection] = useState(false);
  const [actionsOrReactions, setActionsOrReactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const backUrl = process.env.NEXT_PUBLIC_BACK_LOCALHOST;
  const frontUrl = process.env.NEXT_PUBLIC_WEB_LOCALHOST;

  useEffect(() => {
    const fetchServiceData = async () => {
      if (id) {
        try {
          const service = await GetServiceId(id);
          const frontData = JSON.parse(service.front_data);

          const [actions, reactions] = await Promise.all([
            GetServiceIdActions(service.id),
            GetServiceIdReactions(service.id),
          ]);

          const combinedData = [
            ...actions.map(item => ({ ...item, type: 'action' })),
            ...reactions.map(item => ({ ...item, type: 'reaction' })),
          ];

          setActionsOrReactions(combinedData);

          setServiceData({
            id: service.id,
            name: service.name,
            description: service.description,
            icon: frontData.icon.slice(1),
            color: frontData.color,
          });

          const connectionResponse = await GetServiceConnection(service.id);
          setUserConnection(connectionResponse.status);
          setLoading(false);
        } catch (error) {
          console.error('Error loading data:', error);
          setLoading(false);
        }
      }
    };

    fetchServiceData();
  }, [id]);

  if (loading || !serviceData) {
    return <div className={styles.container}>Loading...</div>;
  }

  const handleConnectClick = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      alert('You must log in to use a service.');
      await router.push("/login");
    } else if (!userConnection) {
      const authUrl = `${backUrl}/auth/${serviceData.name}/login?state=${frontUrl}/services/${serviceData.name}|${token}`;
      await router.push(authUrl);
    } else {
      const result = await MySwal.fire({
        title: 'Are you sure you want to disconnect from this service?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, disconnect',
        cancelButtonText: 'Cancel',
        reverseButtons: true,
        background: '#011627',
        confirmButtonColor: '#ff0054',
        cancelButtonColor: '#6c757d',
        color: '#FDFFFC',
        iconColor: "#ff0054",
      });
      if (result.isConfirmed) {
        try {
          await DeleteServiceById(serviceData.id);
          setUserConnection(false);
          toast.success('Disconnected successfully.');
        } catch (error) {
          console.error('Failed to disconnect:', error);
          toast.error('Failed to disconnect. Please try again.');
        }
      }
    }
  };

  const filteredActionsOrReactions = actionsOrReactions.filter(item =>
    item.description.toLowerCase().startsWith(searchInput.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} />
      <div
        className={styles.serviceCard}
        style={{
          borderColor: serviceData.color,
          background: `radial-gradient(at left bottom, ${serviceData.color}, #011727)`,
        }}
      >
        <Image
          src={serviceData.icon}
          alt={""}
          className={styles.icon}
          height={110}
          width={110}
        />

        <div className={styles.serviceText}>
          <div className={styles.serviceTitle} style={{ color: serviceData.color }}>
            {serviceData.name.charAt(0).toUpperCase() + serviceData.name.slice(1)}
          </div>
          <div className={styles.serviceDescription}>
            {serviceData.description}
          </div>
        </div>

        <div
          className={styles.connectButton}
          style={{
            borderColor: serviceData.color,
            backgroundColor: userConnection ? 'transparent' : 'rgba(1, 22, 39, 0.25)',
          }}
          onClick={handleConnectClick}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = userConnection ? '#02223C' : 'rgba(1, 22, 39, 0.25)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = userConnection ? 'transparent' : 'rgba(1, 22, 39, 0.25)')}
        >
          <div className={styles.buttonText} style={{ color: userConnection ? serviceData.color : 'white' }}>
            {userConnection ? 'Connected' : 'Connect'}
          </div>
        </div>

        <div className={styles.profileActionsContainer}>
          <Titles _title={`${serviceData.name.charAt(0).toUpperCase() + serviceData.name.slice(1)} elements`} _color={"white"} _size={"3em"} />
          <div style={{ marginBottom: "20px" }}>
            <SearchBar setSearchInput={setSearchInput} />
          </div>
          <div className={styles.cardContainer}>
            {filteredActionsOrReactions.map((item, index) => (
              <ActionOrReactionCard
                key={index}
                id={item.id}
                _color={serviceData.color}
                _height={400}
                _width={400}
                _service={serviceData.name}
                _titleIcon={serviceData.icon}
                _actionOrReaction={item.description}
                type={item.type}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
