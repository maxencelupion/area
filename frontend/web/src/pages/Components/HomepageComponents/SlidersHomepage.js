import React, {useEffect, useState} from 'react';
import styles from './SliderHomepage.module.css'
import Titles from "@/pages/Components/Utils/Titles";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, EffectCoverflow} from "swiper/modules";
import ServicesCard from "@/pages/Components/ServicesComponents/servicesCard";
import HeaderContents from "@/pages/Components/Utils/HeaderContents";
import AreaCard from "@/pages/Components/AreaComponents/areaCard";
import {getServiceColor, getServiceIcon} from "@/Utils/getServiceData";
import PredefinedAreasCard from "@/pages/Components/AreaComponents/predefinedAreasCard";

import 'swiper/css';
import 'swiper/css/pagination';
import {servicesRequest, actionsRequest, reactionsRequest} from "@/Utils/Request/Request";

export default function SlidersHomepage() {

  const [services, setServices] = useState([])
  const [areasCard, setAreasCard] = useState([])
  const [actions, setActions] = useState([])
  const [reactions, setReactions] = useState([])

  useEffect(() => {
    actionsRequest().then(response => {setActions(response.data)}).catch(error => {console.error('Error: ', error);});
    servicesRequest().then(response => {setServices(response.data)}).catch(error => {console.error('Error: ', error);});
    reactionsRequest().then(response => {setReactions(response.data)}).catch(error => {console.error('Error: ', error);});
  }, []);

  useEffect(() => {
    if (services.length > 0) {
      const predefinedCards = PredefinedAreasCard(services, actions, reactions, 500, 500, 3);
      setAreasCard(predefinedCards);
    }
  }, [services, actions, reactions]);


  return (
    <div>
      <div className={styles.servicesContainer}>
        <Titles _title={"Get started with any services"} _margin={"0 0 100px 0"}/>
        <div className={styles.sliderContainer}>
          <Swiper
            modules={[Autoplay, EffectCoverflow]}
            spaceBetween={30}
            centeredSlides={true}
            loop={true}
            slidesPerView={1}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
            }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              1024: {
                slidesPerView: 3,
              },
              600: {
                slidesPerView: 2,
              },
              480: {
                slidesPerView: 1,
              },
            }}
          >
            {services && services.map((service, index) => (
              <SwiperSlide key={index} className={styles.allSlide}>
                <div className={styles.slide}>
                  <ServicesCard
                    _color={getServiceColor(service.front_data)}
                    _height={500}
                    _width={400}
                    _icon={getServiceIcon(service.front_data)}
                    _title={service.name}
                  />
                </div>

              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

    <div className={styles.homepageActions}>
      <div className={styles.actionsHeader}>
        <HeaderContents circle={false}
                        content={"Areas are our components that group together actions and reactions specific to our services. You can create your own or discover the ones we offer."}
                        title={"Or discover our predefined areas..."}
        />
      </div>

      <div className={styles.actionsSlidesContainer}>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={areasCard.length > 2}
        >
          {areasCard && areasCard.map((card, index) => (
            <SwiperSlide key={index} className={styles.allSlide}>
              <div className={styles.slide}>
                <AreaCard
                  _width={card._width}
                  _height={card._height}
                  _color={card._color}
                  _service={card._service}
                  _action={card._action}
                  _reaction={card._reaction}
                  _titleIcon={card._titleIcon}
                  _actionIcon={card._actionIcon}
                  _actionId={card._actionId}
                  _reactionId={card._reactionId}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  </div>
)
};

