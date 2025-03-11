import axios from 'axios';

// Generic handler function
const handler = async (method, url, data) => {
  try {
    const response = await axios[method](url, data);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Fetch handler for GET request
export const fetchHandler = async (url) => {
  return handler('get', url);
};

// Get handler for GET request
export const getHandler = async (url, params) => {
  return handler('get', url, { params });
};

// Post handler for POST request
export const postHandler = async (url, data) => {
  return handler('post', url, data);
};

// Put handler for PUT request
export const putHandler = async (url, data) => {
  return handler('put', url, data);
};

// Delete handler for DELETE request
export const deleteHandler = async (url) => {
  return handler('delete', url);
};
