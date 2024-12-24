import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/', // Replace with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Example of a GET request
export const getData = async (endpoint: string) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Example of a POST request
export const postData = async (endpoint: string, data: any) => {
    try {
      const response = await api.post(endpoint, data);
      return response.data;
    } catch (error) {
      console.error('Error posting data:', error);
      throw error;
    }
  };

// Example of a PUT request
export const putData = async (endpoint: string, data: any) => {
  try {
    const response = await api.put(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};

// Example of a DELETE request
export const deleteData = async (endpoint: string) => {
  try {
    const response = await api.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
};

export default api;