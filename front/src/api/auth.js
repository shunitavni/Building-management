import axios from 'axios';

const END_POINT_SignUp = 'http://localhost:3232/api/users/signup';
const END_POINT_LogIn = 'http://localhost:3232/api/users/login';
const END_POINT_Logout = 'http://localhost:3232/api/users/logout';

export const signUp = async (email, password, name) => {
  return axios
    .post(END_POINT_SignUp, {
      email,
      password,
      name,
    })
    .then((res) => {
      const resData = res.data;
      localStorage.setItem('token', resData.token);

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      localStorage.setItem('expiryDate', tomorrow);

      return { token: resData.token };
    });
};

export const logIn = async (email, password) => {
  return axios
    .post(END_POINT_LogIn, {
      email,
      password,
    })
    .then((res) => {
      const resData = res.data;
      localStorage.setItem('token', resData.token);

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      localStorage.setItem('expiryDate', tomorrow);

      return { token: resData.token };
    });
};

export const logOut = (jwt) => {
  return axios
    .post(
      END_POINT_Logout,
      {},
      {
        headers: {
          Authorization: 'Bearer ' + jwt,
        },
      }
    )
    .then(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('expiryDate');
    });
};
