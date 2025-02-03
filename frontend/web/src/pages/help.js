import Titles from "@/pages/Components/Utils/Titles";

import { TbPointFilled } from "react-icons/tb";
import { MdHomeRepairService } from "react-icons/md";
import { IoLayersOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { FaMobileAlt } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";

import styles from "./PagesStyles/help.module.css"
import {useRouter} from "next/router";

function HelpList({elements}) {
  return (
    <div className={styles.helpElements}>
      <div className={styles.helpElementsHeader}>
        {elements.icon}
        <Titles _title={elements.title} _size={"3em"} _margin={"0"}/>
      </div>

      <div className={styles.helpElementList}>
        {elements.list.map((elem, index) => (
          <div key={index} className={styles.helpListContainer}>
            <TbPointFilled color={"white"}/>
            <div className={styles.helpElementContent}>
              <div className={styles.helpElementsText}>{elem.text}</div>
              {elem.element}
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}

export default function HelpPage() {

  const router = useRouter();

  const ConnectServiceList = {
    title: "How to connect / disconnect to a Service ?",
    icon: <MdHomeRepairService color={"#FF0054"} size={50}/>,
    list: [
      {text: "Go to the services page", element: null},
      {text: "Click on the service you want to connect", element:null},
      {text: "Click on the connection / disconnection button in the service page", element:null},
    ]
  }

  const CreateAreaList = {
    title: "How to create an area ?",
    icon: <IoLayersOutline color={"#FF0054"} size={50}/>,
    list: [
      {text: "Go to the my area page", element: null},
      {text: "Select at least 1 action and 1 reaction (you can add maximum 3 reactions)", element:null},
      {text: "Enter a name and a description for you area", element:null},
      {text: "Select a color", element:null},
      {text: "Create your area !", element:null},
    ]
  }

  const DeactivateArea = {
    title: "How to activate / deactivate an area ?",
    icon: <IoLayersOutline color={"#FF0054"} size={50}/>,
    list: [
      {text: "Go to the my area page", element: null},
      {text: "Your areas are displayed on the right in the My Areas container.", element:null},
      {text: "Click on the area your want to activate / deactivate", element:null},
      {text: "Once on the area page, you can change his status", element:null},
    ]
  }

  const DeleteArea = {
    title: "How to delete an area ?",
    icon: <IoLayersOutline color={"#FF0054"} size={50}/>,
    list: [
      {text: "Go to the my area page", element: null},
      {text: `On the area you wish to delete, click on the `, element: <MdDelete color={"#FF0054"} size={20}/>},
      {text: `And confirm deletion`, element: null},
    ]
  }

  const ChangeProfileInfos = {
    title: "How to change your profile information ?",
    icon: <FaUserEdit color={"#FF0054"} size={50}/>,
    list: [
      {text: "Go to your profile page", element: null},
      {text: "Click on the card of the element you wish to change", element: null},
      {text: "You can now change your first name, last name or password!", element: null},
    ]
  }

  const DownloadMobile = {
    title: "How to download Nexpo mobile  ?",
    icon: <FaMobileAlt color={"#FF0054"} size={50}/>,
    list: [
      {text: "Go to the homepage", element: null},
      {text: "at the bottom of the page you can download the mobile apk!", element: null},
    ]
  }

  return (
    <div className={styles.helpContainer}>
      <div className={styles.helpGoBackButton} onClick={() => router.push('/profile')}>
        <IoMdArrowRoundBack color={"#FF0054"} size={30}/>
        <div className={styles.helpGoBackText}>Go back</div>
      </div>
      <div className={styles.helpContent}>
        <div className={styles.helpHeader}>
          <Titles _title={"Help"} _size={"3em"}/>
          <div className={styles.helpHeaderText}>You are on the help page. This page will answer all your questions
            about Services, Areas, Login and more...</div>
        </div>

        <div className={styles.helpList}>
          <HelpList elements={ConnectServiceList} />
          <HelpList elements={CreateAreaList} />
          <HelpList elements={DeactivateArea} />
          <HelpList elements={DeleteArea} />
          <HelpList elements={ChangeProfileInfos} />
          <HelpList elements={DownloadMobile} />
        </div>

      </div>
    </div>
  )
}
