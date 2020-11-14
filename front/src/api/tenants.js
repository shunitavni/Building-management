import axios from 'axios';

const END_POINT = 'http://localhost:3232/api/tenants';

export const fetchTenants = async (params, jwt) => {
  return await axios.get(END_POINT, {
    params,
    headers: {
      Authorization: 'Bearer ' + jwt,
    },
  });
};

// export const fetchTenantsByDebts = async(debts, jwt) => {
//   return await axios.get(END_POINT, {
//     params: {
//       debts,
//     },
//     headers: {
//       Authorization: 'Bearer ' + jwt,
//     },
//   });
// }

// export const fetchTenantsByName = async (name, jwt) => {
//   return await axios.get(`${END_POINT}/${name}`, {
//     headers: {
//       Authorization: 'Bearer ' + jwt,
//     },
//   });
// };

export const fetchTenantById = async (id, jwt) => {
  return await axios.get(`${END_POINT}/id/${id}`, {
    headers: {
      Authorization: 'Bearer ' + jwt,
    },
  });
};

export const changeTenantDetails = async (id, body, jwt) => {
  return await axios.patch(`${END_POINT}/id/${id}`, body, {
    headers: {
      Authorization: 'Bearer ' + jwt,
    },
  });
};

export const createTenant = async (body, jwt) => {
  return await axios.post(END_POINT, body, {
    headers: {
      Authorization: 'Bearer ' + jwt,
    },
  });
};

export const deleteTenantById = async (id, jwt) => {
  return await axios.delete(`${END_POINT}/id/${id}`, {
    headers: {
      Authorization: 'Bearer ' + jwt,
    },
  });
}
