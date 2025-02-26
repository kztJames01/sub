// api.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5500/api/v1';

export const getSubscriptions = async (userId: string) => {
  const response = await axios.get(`${API_BASE_URL}/subs/${userId}`);
  return response.data;
};

export const createSubscription = async (subscription: Subscription) => {
  const response = await axios.post(`${API_BASE_URL}/subs`, subscription);
  return response.data;
};

export const updateSubscription = async (id: string, subscription: Subscription) => {
  const response = await axios.put(`${API_BASE_URL}/subs/${id}`, subscription);
  return response.data;
};

export const deleteSubscription = async (id: string) => {
  const response = await axios.delete(`${API_BASE_URL}/subs/${id}`);
  return response.data;
};