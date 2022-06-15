import { a } from "aws-amplify";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_BASE_URL;
export const onShortVideoUpload = async (body) => {
  const url = `${API_URL}/short-content/upload`;
  let response = await axios.put(url, body);
  return response;
};

export const getShortVideo = async (body) => {
  let response = await axios.post(`${API_URL}/short-content/get`, body);
  return response.data;
};

export const likeShortVideo = async (body) => {
  let response = await axios.post(`${API_URL}/short-content/like`, body);
  return response.status;
};

export const queryDB = async (body) => {
  let response = await axios.post(`${API_URL}/query`, body);
  return response.data;
};
export const onLongVideoUpload = async (body) => {
  let response = await axios.put(`${API_URL}/long-content/upload`, body);
  return response;
};
export const rateLongVideos = async (body) => {
  let response = await axios.post(`${API_URL}/long-content/rating`, body);
  return response;
};

export const getLongVideos = async (body) => {
  let response = await axios.post(`${API_URL}/long-content/get`, body);
  return response;
};

export const indexOpensearch = async (body) => {
  let response = await axios.post(`${API_URL}/opensearch`, body);
  return response;
};

export const fetchOpensearch = async (query) => {
  let response = await axios.get(`${API_URL}/opensearch?q=${query}`);
  return response;
};

export const createPaymentOrder = async (body) => {
  let response = await axios.post(`${API_URL}/premium/payment`, body);
  return response;
};

export const confirmSubscription = async (body) => {
  let response = await axios.post(`${API_URL}/premium/confirm`, body);
  return response;
};
