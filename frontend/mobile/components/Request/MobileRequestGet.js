import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {IP} from "./MobileEnvData"

const RequestGet = async (url) => {
  try {
    return await axios.get(url);
  } catch (error) {
    console.error('Error: ', error);
    return null;
  }
}

const servicesRequest = async () => {
  return await RequestGet(`${IP}/services`);
}

const actionsRequest = async () => {
  return await RequestGet(`${IP}/actions`);
}

const elementByIdRequest = async (id) => {
  return await RequestGet(`${IP}/elements/${id}`);
}

const reactionsRequest = async () => {
  return await RequestGet(`${IP}/reactions`);
}

const elementsFromService = async (id) => {
  return await RequestGet(`${IP}/services/${id}/elements`);
}

const servicesByIdRequest = async (id) => {
  return await RequestGet(`${IP}/services/${id}`);
}


export {servicesRequest, reactionsRequest, actionsRequest, elementByIdRequest, elementsFromService, servicesByIdRequest};