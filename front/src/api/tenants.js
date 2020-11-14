import axios from 'axios';

const END_POINT = 'http://localhost:3232/api/tenants';

export const fetchAllTenants = async () => {
  return await axios.get(END_POINT);
};

export const fetchTenantsByName = async (name) => {
  return await axios.get(`${END_POINT}/${name}`);
};

export const fetchTenantById = async (id) => {
  return await axios.get(`${END_POINT}/id/${id}`);
};

export const changeTenantDetails = async (id, body) => {
  return await axios.patch(`${END_POINT}/id/${id}`, body);
};

export const createTenant = async () => {
  return await axios.post(END_POINT, body);
};