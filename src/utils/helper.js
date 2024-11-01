import axios from "axios";

export const handleGetRequest = async (url) => {
  const response = await axios.get(url);
  return response;
};

export const handlePostRequest = async (url) => {
  const response = await axios.post(url);
  return response;
};

export const handlePutRequest = async (url) => {
  const response = await axios.put(url);
  return response;
};

export const handleDeleteRequest = async (url) => {
  const response = await axios.delete(url);
  return response;
};