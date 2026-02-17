import axios from "axios";
import { ContactType } from "../_types/contact";

const API_URL = "https://contact-api-64ey.onrender.com";

export const getContacts = async (userId: number)  => {
    const response = await axios.get(`${API_URL}/contacts?userId=${userId}`);
    return response.data;
}

export const getContactsById = async (id: number)  => {
    const response = await axios.get(`${API_URL}/contacts/${id}`);
    return response.data;
}

export const createContact = async (contact: ContactType)  => {
    const response = await axios.post(`${API_URL}/contacts`, contact);
    return response.data;
}

export const updateContact = async (id: string | number, contact: ContactType) => {  // string | number
  console.log("PUT URL:", `${API_URL}/contacts/${id}`);
  const response = await axios.put(`${API_URL}/contacts/${id}`, contact);
  return response.data;
};


export const deleteContact = async (id: string | number) => {
  const response = await axios.delete(`${API_URL}/contacts/${id}`);
  return response.data;
};
