import axios from 'axios';

const END_POINT = 'http://localhost:3232/api/users/signup';

export const signUp = async (email, password, name) => {
  return axios.post(END_POINT, {
    email,
    password,
    name
  }).then(res => {
    const resData = res.data;
    localStorage.setItem('token', resData.token);
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    localStorage.setItem('expiryDate', tomorrow);

    return { token: resData.token };
  });
};
