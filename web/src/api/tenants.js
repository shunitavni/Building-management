import axios from 'axios';

const END_POINT = 'http://localhost:3232/';

export const fetchAllTenants = async () => {
  return await axios.get(END_POINT);
}
