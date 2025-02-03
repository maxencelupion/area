import styles from "../PagesStyles/services.module.css"
import Titles from "@/pages/Components/Utils/Titles";
import {useEffect, useState} from "react";
import SearchBar from "@/pages/Components/Utils/searchBar";


import ServicesCard from "@/pages/Components/ServicesComponents/servicesCard";
import AreaCard from "@/pages/Components/AreaComponents/areaCard";
import PredefinedAreasCard from "@/pages/Components/AreaComponents/predefinedAreasCard";
import {actionsRequest, reactionsRequest, servicesRequest} from "@/Utils/Request/Request";
import {getServiceColor, getServiceIcon} from "@/Utils/getServiceData";

export default function ServicesPage() {

  const [searchInput, setSearchInput] = useState("");
  const [activeSearch, setActiveSearch] = useState('All');
  const [actions, setActions] = useState([]);
  const [reactions, setReactions] = useState([]);
  const [services, setServices] = useState([]);
  const [areasCard, setAreasCard] = useState([]);

  useEffect(() => {
    actionsRequest().then(response => {setActions(response.data)}).catch(error => {console.error('Error: ', error);});
    servicesRequest().then(response => {setServices(response.data)}).catch(error => {console.error('Error: ', error);});
    reactionsRequest().then(response => {setReactions(response.data)}).catch(error => {console.error('Error: ', error);});
  }, []);

  useEffect(() => {
    if (services.length > 0) {
      const predefinedCards = PredefinedAreasCard(services, actions, reactions, 400, 500, 6);
      setAreasCard(predefinedCards);
    }
  }, [services, actions, reactions]);

  const filteredServicesCards = services.filter(service =>
    service.name.toLowerCase().startsWith(searchInput.toLowerCase())
  );

  const filteredActionsCards = areasCard.filter(action =>
    action._service.toLowerCase().startsWith(searchInput.toLowerCase())
  );

  return (
    <div className={styles.servicesBody}>
    <div className={styles.servicesContainer}>
      <div className={styles.servicesHeader}>
        <div className={styles.headerTitle}>
          <Titles _title={"Explore all available services"} _margin={"100px 0"}/>
        </div>
        <div className={styles.servicesSearch}>
          <div className={styles.searchElements}>
            <div onClick={() => setActiveSearch('All')} className={`${styles.searchTab} ${activeSearch === 'All' ? styles.searchActive : ''}`}>All</div>
            <div onClick={() => setActiveSearch('Services')} className={`${styles.searchTab} ${activeSearch === 'Services' ? styles.searchActive : ''}`}>Services</div>
            <div onClick={() => setActiveSearch('Areas')} className={`${styles.searchTab} ${activeSearch === 'Areas' ? styles.searchActive : ''}`}>Areas</div>
          </div>
          <div className={styles.searchBar}>
            <SearchBar setSearchInput={setSearchInput} />
          </div>

        </div>
      </div>
      <div className={styles.cardContainer}>
        {(activeSearch === 'All' || activeSearch === 'Services') && filteredServicesCards.map((service, index) => (
          <ServicesCard
            key={index}
            _color={getServiceColor(service.front_data)}
            _height={500}
            _width={400}
            _icon={getServiceIcon(service.front_data)}
            _title={service.name}
          />
        ))}

        {(activeSearch === 'All' || activeSearch === 'Areas') && filteredActionsCards.map((action, index) => (
          <AreaCard
            key={index}
            _color={action._color}
            _height={action._height}
            _width={action._width}
            _service={action._service}
            _action={action._action}
            _reaction={action._reaction}
            _titleIcon={action._titleIcon}
            _actionIcon={action._actionIcon}
            _actionId={action._actionId}
            _reactionId={action._reactionId}
          />
        ))}

      </div>
      {filteredServicesCards.length === 0 && filteredActionsCards.length === 0 && (
        <div className={styles.nothingFoundContainer}>
          <div className={styles.nothingFoundText}>Nothing found</div>
        </div>
      )}
    </div>
    </div>
  );
}
