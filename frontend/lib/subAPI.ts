// api.ts
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getSubscriptions = async (userId: string) => {
  const response = await axios.get(`${API_BASE_URL}/subs/${userId}`);
  return response.data;
};

async function createSubscription(subscription: Subscription) : Promise<ApiResponse>{
  try{
    const response = await fetch(`${API_BASE_URL}/subs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(subscription),
    });
    const data: ApiResponse = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to create subscription");
    }
    return data;
  } catch (error) {
    console.error("Error creating subscription:", error);
    throw error;
  }
}

export const updateSubscription = async (id: string, subscription: Subscription) => {
  try{
    const response = await axios.put(`${API_BASE_URL}/subs/${id}`, subscription, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating subscription:", error);
    throw error;
  }
};

export const deleteSubscription = async (id: string) => {
  try{
    const response = await axios.delete(`${API_BASE_URL}/subs/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting subscription:", error);
    throw error;
  }
};

export { createSubscription }