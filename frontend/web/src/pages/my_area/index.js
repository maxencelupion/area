import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { ChromePicker } from "react-color";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "@/pages/PagesStyles/my_area.module.css";
import {
  actionsRequest,
  reactionsRequest,
  servicesRequest,
} from "@/Utils/Request/Request";
import PostAreas from "@/Utils/Request/PostAreas";
import GetAreas from "@/Utils/Request/GetAreas";
import GetServiceConnection from "@/Utils/Request/GetServiceConnection";
import GetActionOrReactionById from "@/Utils/Request/GetActionOrReactionById";
import GetServiceId from "@/Utils/Request/GetServiceId";
import DeleteAreas from "@/Utils/Request/DeleteAreas";
import AreaCardCreated from "@/pages/Components/AreaComponents/areaCardCreated.js";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import dynamic from "next/dynamic";
import "simplebar-react/dist/simplebar.min.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Image from "next/image";
import MenuPortal from "@/pages/Components/Utils/menuPortal";
import ContrastText from "@/pages/Components/Utils/ContrastText";
import IconSvgComponent from "@/pages/Components/Utils/IconSvgOrPng";

const SimpleBar = dynamic(() => import("simplebar-react"), { ssr: false });
const MySwal = withReactContent(Swal);

const MyArea = () => {
  const router = useRouter();
  const { action, reaction } = router.query;
  const [dataChanged, setDataChanged] = useState(false);
  const [services, setServices] = useState([]);
  const [actionsArea, setActionsArea] = useState([]);
  const [reactionsArea, setReactionsArea] = useState([]);
  const [areas, setAreas] = useState([]);
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [showReactionMenu, setShowReactionMenu] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [authUrl, setAuthUrl] = useState(null);
  const [areaName, setAreaName] = useState("");
  const [areaDescription, setAreaDescription] = useState("");
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [color, setColor] = useState("#FFFFFF");
  const [showPopup, setShowPopup] = useState(false);
  const [additionalReactions, setAdditionalReactions] = useState([]);
  const [showReactionMenuIndex, setShowReactionMenuIndex] = useState(null);
  const ifButtonRef = useRef(null);
  const thenButtonRef = useRef(null);
  const additionalButtonsRefs = useRef([]);
  const backUrl = process.env.NEXT_PUBLIC_BACK_LOCALHOST;
  const frontUrl = process.env.NEXT_PUBLIC_WEB_LOCALHOST;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesData, actionsData, reactionsData, areasData] =
          await Promise.all([
            servicesRequest(),
            actionsRequest(),
            reactionsRequest(),
            GetAreas(),
          ]);

        const services = servicesData.data.map((service) => {
          const frontData = JSON.parse(service.front_data);
          return {
            id: service.id,
            _service: service.name,
            _color: frontData.color,
            _titleIcon: frontData.icon,
          };
        });
        setServices(services);

        const serviceMap = services.reduce((acc, service) => {
          acc[service.id] = {
            _color: service._color,
            _titleIcon: service._titleIcon,
          };
          return acc;
        }, {});

        const actions = actionsData.data.map((action) => ({
          _id: action.id,
          _service: action.name,
          _action: action.description,
          serviceId: action.serviceId,
          _color: serviceMap[action.serviceId]?._color || "#000000",
          _titleIcon: serviceMap[action.serviceId]?._titleIcon || "",
        }));
        setActionsArea(actions);

        const reactions = reactionsData.data.map((reaction) => ({
          _id: reaction.id,
          _service: reaction.name,
          _reaction: reaction.description,
          serviceId: reaction.serviceId,
          _color: serviceMap[reaction.serviceId]?._color || "#000000",
          _titleIcon: serviceMap[reaction.serviceId]?._titleIcon || "",
        }));
        setReactionsArea(reactions);
        setAreas(areasData);

        if (action) {
          await fetchAndSelectActionOrReaction(action, true);
        }
        if (reaction) {
          await fetchAndSelectActionOrReaction(reaction, false);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchData();
  }, [action, reaction, dataChanged]);

  const fetchAndSelectActionOrReaction = async (id, isAction) => {
    try {
      const elementData = await GetActionOrReactionById(id);
      const serviceData = await GetServiceId(elementData.serviceId);
      const serviceStatus = await GetServiceConnection(elementData.serviceId);

      const frontData = JSON.parse(serviceData.front_data);

      const element = {
        _id: elementData.id,
        _service: elementData.name,
        _action: elementData.type === "action" ? elementData.description : null,
        _reaction:
          elementData.type === "reaction" ? elementData.description : null,
        serviceId: elementData.serviceId,
        _color: frontData.color || "#000000",
        _titleIcon: frontData.icon || "",
      };

      if (serviceStatus.status) {
        if (isAction) {
          setSelectedAction(element);
        } else {
          setSelectedReaction(element);
        }
      } else {
        setAuthUrl(
          `${backUrl}/auth/${serviceData.name}/callback?state=${frontUrl}/my_area`
        );
      }
    } catch (error) {
      console.error("Error selecting action or reaction :", error);
    }
  };

  const handleSelectAction = async (action) => {
    const serviceStatus = await GetServiceConnection(action.serviceId);
    if (serviceStatus.status) {
      setSelectedAction(action);
      setShowActionMenu(false);
    } else {
      const serviceName = services.find(
        (service) => service.id === action.serviceId
      )?._service;
      setAuthUrl(
        `${backUrl}/auth/${serviceName}/callback?state=${frontUrl}/my_area`
      );
    }
  };

  const handleSelectReaction = async (reaction) => {
    const serviceStatus = await GetServiceConnection(reaction.serviceId);
    if (serviceStatus.status) {
      if (showReactionMenuIndex === null) {
        setSelectedReaction(reaction);
        setShowReactionMenu(false);
      } else {
        handleSelectAdditionalReaction(reaction, showReactionMenuIndex);
      }
      setShowReactionMenuIndex(null);
    } else {
      const serviceName = services.find(
        (service) => service.id === reaction.serviceId
      )?._service;
      setAuthUrl(
        `${backUrl}/auth/${serviceName}/callback?state=${frontUrl}/my_area`
      );
    }
  };

  const handleCreateArea = async () => {
    let hasError = false;
    setNameError("");
    setDescriptionError("");
    if (areaName.length < 1 || areaName.length > 15) {
      setNameError("The name must be between 1 and 15 characters.");
      hasError = true;
    }
    if (areaDescription.length < 1 || areaDescription.length > 90) {
      setDescriptionError("Description must be between 1 and 90 characters.");
      hasError = true;
    }
    if (hasError) return;
    setShowPopup(false);
    if (selectedAction && selectedReaction) {
      const reactions = [
        {
          parameter_reaction: {},
          order: 1,
          elementId: selectedReaction._id,
        },
        ...additionalReactions.map((reaction, index) => ({
          parameter_reaction: {},
          order: index + 2,
          elementId: reaction._id,
        })),
      ];
      const newArea = {
        name: areaName,
        description: areaDescription,
        parameter: {},
        active: true,
        actionId: selectedAction._id,
        reactions: reactions,
        color: color,
      };
      try {
        await PostAreas(newArea);
        toast.success("Area created successfully!");
        setDataChanged(!dataChanged);
        setSelectedAction(null);
        setAdditionalReactions([]);
        setSelectedReaction(null);
        setShowReactionMenu(false);
        setShowReactionMenuIndex(null);
      } catch (error) {
        console.error("Error:", error);
        toast.error("Area creation failed. Please try again.");
      }
    } else {
      toast.warning("Please select an action and reaction before continuing.");
    }
  };

  const handleDeleteArea = async (id) => {
    const result = await MySwal.fire({
      title: "Are you sure you want to delete this area?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
      reverseButtons: true,
      background: "#011627",
      confirmButtonColor: "#ff0054",
      cancelButtonColor: "#6c757d",
      color: "#FDFFFC",
      iconColor: "#ff0054",
    });

    if (result.isConfirmed) {
      try {
        await DeleteAreas(id);
        setAreas(areas.filter((area) => area.id !== id));
        toast.success("Area deleted successfully.");
        setDataChanged(!dataChanged);
      } catch (error) {
        console.error("Failed to delete area:", error);
        toast.error("Failed to delete area. Please try again.");
      }
    }
  };

  const toggleActionMenu = () => {
    setShowReactionMenuIndex(null);
    setShowActionMenu(!showActionMenu);
    if (showReactionMenu) setShowReactionMenu(false);
  };

  const toggleReactionMenu = () => {
    setShowReactionMenuIndex(null);
    setShowReactionMenu(!showReactionMenu);
    if (showActionMenu) setShowActionMenu(false);
  };

  const toggleReactionMenuIndex = (index) => {
    if (showActionMenu) setShowActionMenu(false);
    if (showReactionMenu) setShowReactionMenu(false);
    setShowReactionMenuIndex(showReactionMenuIndex === index ? null : index);
  };

  const ContinueSelectcolor = () => {
    if (selectedAction && selectedReaction) {
      setColor(selectedAction._color);
      setShowPopup(true);
    } else {
      toast.error("Please select an action and reaction before continuing.");
    }
  };

  const handleAddReaction = () => {
    if (additionalReactions.length < 2) {
      setAdditionalReactions([...additionalReactions, null]);
    }
  };

  const handleSelectAdditionalReaction = (reaction, index) => {
    const updatedReactions = [...additionalReactions];
    updatedReactions[index] = reaction;
    setAdditionalReactions(updatedReactions);
  };

  const handleRemoveReaction = (index) => {
    setShowReactionMenuIndex(null);
    const updatedReactions = [...additionalReactions];
    updatedReactions.splice(index, 1);
    setAdditionalReactions(updatedReactions);
  };

  const setAdditionalButtonRef = (el, index) => {
    additionalButtonsRefs.current[index] = el;
  };

  function getContrastYIQ(hexcolor) {
    hexcolor = hexcolor.replace("#", "");
    const r = parseInt(hexcolor.substring(0, 2), 16);
    const g = parseInt(hexcolor.substring(2, 4), 16);
    const b = parseInt(hexcolor.substring(4, 6), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? "black" : "white";
  }

  return (
    <div className="pageWrapper">
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
      />
      {authUrl && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h2>Service Connection Required</h2>
            <p>
              You need to connect to this service to use this action or
              reaction.
            </p>
            <button
              className={styles.connectButton}
              onClick={() => (window.location.href = authUrl)}
            >
              Connect to Service
            </button>
            <button
              className={styles.closeButton}
              onClick={() => setAuthUrl(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>Create Area</h2>
          <div className={styles.verticalContainer}>
            <div
              className={styles.actionContainer}
              ref={ifButtonRef}
              onClick={toggleActionMenu}
              style={
                selectedAction ? { backgroundColor: selectedAction._color } : {}
              }
            >
              <div className={styles.ifText}>
                <ContrastText
                  backgroundColor={
                    selectedAction ? selectedAction._color : "#fdfffc"
                  }
                >
                  If
                </ContrastText>
              </div>
              {selectedAction ? (
                <div
                  className={styles.actionText}
                  style={{ color: selectedAction._color }}
                >
                  <ContrastText backgroundColor={selectedAction._color}>
                    {selectedAction._action}
                  </ContrastText>
                  {selectedAction._titleIcon && (
                    <IconSvgComponent
                      svgPath={selectedAction._titleIcon.slice(1)}
                      backgroundColor={selectedAction._color}
                    />
                  )}
                </div>
              ) : (
                <div className={styles.addAction}>
                  <div className={styles.addIcon}>+</div>
                </div>
              )}
            </div>

            {showActionMenu && (
              <MenuPortal triggerRef={ifButtonRef}>
                <SimpleBar className={styles.menu}>
                  {actionsArea
                    .sort((a, b) => a._service.localeCompare(b._service))
                    .map((action, index) => (
                      <div
                        key={index}
                        className={styles.menuItem}
                        onClick={() => handleSelectAction(action)}
                      >
                        <ContrastText backgroundColor={action._color}>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <IconSvgComponent
                              svgPath={action._titleIcon.slice(1)}
                              backgroundColor={action._color}
                            />
                            <span style={{ marginLeft: "10px" }}>
                              {action._service} - {action._action}
                            </span>
                          </div>
                        </ContrastText>
                      </div>
                    ))}
                </SimpleBar>
              </MenuPortal>
            )}
            <div
              className={styles.dottedLine}
              style={{
                backgroundImage:
                  selectedAction && selectedReaction
                    ? `linear-gradient(to bottom, ${selectedAction._color} 0%, ${selectedReaction._color} 100%)`
                    : selectedAction
                    ? `linear-gradient(to bottom, ${selectedAction._color} 0%, #ff0054 100%)`
                    : selectedReaction
                    ? `linear-gradient(to bottom, #fdfffc 0%, ${selectedReaction._color} 100%)`
                    : "linear-gradient(to bottom, #fdfffc 0%, #ff0054 100%)",
              }}
            ></div>

            <div
              className={styles.reactionContainer}
              style={
                selectedReaction
                  ? { backgroundColor: selectedReaction._color }
                  : {}
              }
              ref={thenButtonRef}
              onClick={toggleReactionMenu}
            >
              <div className={styles.thenText}>
                <ContrastText
                  backgroundColor={
                    selectedReaction ? selectedReaction._color : "#FF0054"
                  }
                >
                  Then
                </ContrastText>
              </div>
              {selectedReaction ? (
                <div
                  className={styles.reactionText}
                  style={{ color: selectedReaction._color }}
                >
                  <ContrastText backgroundColor={selectedReaction._color}>
                    {selectedReaction._reaction}
                  </ContrastText>
                  {selectedReaction._titleIcon && (
                    <IconSvgComponent
                      svgPath={selectedReaction._titleIcon.slice(1)}
                      backgroundColor={selectedReaction._color}
                    />
                  )}
                </div>
              ) : (
                <div className={styles.addAction}>
                  <div className={styles.addIcon}>+</div>
                </div>
              )}
            </div>

            {showReactionMenu && (
              <MenuPortal triggerRef={thenButtonRef}>
                <SimpleBar className={styles.menuReaction}>
                  {reactionsArea
                    .sort((a, b) => a._service.localeCompare(b._service))
                    .map((reaction, index) => (
                      <div
                        key={index}
                        className={styles.menuItem}
                        onClick={() => handleSelectReaction(reaction)}
                      >
                        <ContrastText backgroundColor={reaction._color}>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <IconSvgComponent
                              svgPath={reaction._titleIcon.slice(1)}
                              backgroundColor={reaction._color}
                            />
                            <span style={{ marginLeft: "10px" }}>
                              {reaction._service} - {reaction._reaction}
                            </span>
                          </div>
                        </ContrastText>
                      </div>
                    ))}
                </SimpleBar>
              </MenuPortal>
            )}

            {additionalReactions.map((reaction, index) => (
              <div key={index} className={styles.additionalReactionContainer}>
                <div
                  className={styles.reactionContainer}
                  ref={(el) => setAdditionalButtonRef(el, index)}
                  onClick={() => toggleReactionMenuIndex(index)}
                  style={
                    selectedReaction
                      ? {
                          backgroundColor: reaction
                            ? reaction._color
                            : "#FF0054",
                        }
                      : {}
                  }
                >
                  <div className={styles.thenText}>
                    <ContrastText
                      backgroundColor={reaction ? reaction._color : "#FF0054"}
                    >
                      Then
                    </ContrastText>
                  </div>
                  {reaction ? (
                    <div
                      className={styles.reactionText}
                      style={{ color: reaction._color }}
                    >
                      <ContrastText backgroundColor={reaction._color}>
                        {reaction._reaction}
                      </ContrastText>
                      <FaTrash
                        className={styles.trashIcon}
                        style={{
                          color: getContrastYIQ(
                            reaction ? reaction._color : "#011627"
                          ),
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveReaction(index);
                        }}
                      />
                    </div>
                  ) : (
                    <div className={styles.addAction}>
                      <div className={styles.addActionThenComponentIndex}>
                        <div className={styles.addIcon}>+</div>
                      </div>
                      <FaTrash
                        className={styles.trashIcon}
                        style={{
                          color: "FDFFFC",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveReaction(index);
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}

            {selectedReaction && additionalReactions.length === 0 && (
              <div
                className={styles.addReactionButton}
                onClick={handleAddReaction}
              >
                <div className={styles.addIcon}>+</div>
              </div>
            )}

            {additionalReactions.length === 1 &&
              additionalReactions[additionalReactions.length - 1] && (
                <div
                  className={styles.addReactionButton}
                  onClick={handleAddReaction}
                >
                  <div className={styles.addIcon}>+</div>
                </div>
              )}

            {showReactionMenuIndex !== null && (
              <SimpleBar
                style={{ maxHeight: "12em", overflowY: "auto" }}
                className={styles.menuReaction}
              >
                {reactionsArea
                  .sort((a, b) => a._service.localeCompare(b._service))
                  .map((reaction, reactionIndex) => (
                    <div
                      key={reactionIndex}
                      className={styles.menuItem}
                      style={{ color: reaction._color }}
                      onClick={() => handleSelectReaction(reaction)}
                    >
                      <ContrastText backgroundColor={reaction._color}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <IconSvgComponent
                            svgPath={reaction._titleIcon.slice(1)}
                            backgroundColor={reaction._color}
                          />
                          <span style={{ marginLeft: "10px" }}>
                            {reaction._service} - {reaction._reaction}
                          </span>
                        </div>
                      </ContrastText>
                    </div>
                  ))}
              </SimpleBar>
            )}
          </div>
          <div
            className={styles.continueButton}
            onClick={() => ContinueSelectcolor()}
          >
            <div className={styles.buttonText}>Continue</div>
          </div>
        </div>

        <SimpleBar className={styles.areasContainer}>
          <h2 className={styles.title}>My Areas</h2>
          {areas.length === 0 ? (
            <div className={styles.emptyState}>
              <FaMagnifyingGlass className={styles.emptyIcon} />
              <p className={styles.emptyText}>No Areas created yet</p>
            </div>
          ) : (
            <div className={styles.areasList}>
              {areas.map((area) => (
                <AreaCardCreated
                  key={area.id}
                  _width="30vh"
                  _height="18vw"
                  _name={area.name}
                  _description={area.description}
                  _areaId={area.id}
                  _actionId={area.action.id}
                  _reactionId={area.areaReaction[0].elementId}
                  _active={area.active}
                  _color={area.color}
                  _reactionNb={area.areaReaction.length}
                  onDeleteArea={handleDeleteArea}
                />
              ))}
            </div>
          )}
        </SimpleBar>
      </div>

      {showPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <label className={styles.label}>Area Name</label>
            <input
              type="text"
              value={areaName}
              onChange={(e) => setAreaName(e.target.value)}
              className={`${styles.input} ${
                nameError ? styles.inputError : ""
              }`}
            />
            {nameError && <div className={styles.errorText}>{nameError}</div>}

            <label className={styles.label}>Area Description</label>
            <input
              type="text"
              value={areaDescription}
              onChange={(e) => setAreaDescription(e.target.value)}
              className={`${styles.input} ${
                descriptionError ? styles.inputError : ""
              }`}
            />
            {descriptionError && (
              <div className={styles.errorText}>{descriptionError}</div>
            )}

            <label className={styles.label}>Select Color</label>
            <div className={styles.colorPickerContainer}>
              <ChromePicker
                color={color}
                onChange={(color) => setColor(color.hex)}
              />
            </div>

            <div className={styles.popupButtonContainer}>
              <button
                className={styles.continueButton2}
                onClick={() => {
                  handleCreateArea();
                }}
              >
                <div className={styles.buttonText}>Continue</div>
              </button>
              <button
                className={styles.closeButton}
                onClick={() => setShowPopup(false)}
              >
                <div className={styles.closeText}>Cancel</div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyArea;
