import { jwtDecode } from 'jwt-decode';

export const checkToken = () => {
  const token = localStorage.getItem('token');
  try {
    const decoded = jwtDecode(token);

    const timeInS = Date.now() / 1000;
    return decoded && decoded.exp > timeInS;
  } catch (e) {
    return false;
  }
};
