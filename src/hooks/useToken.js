import { useContext } from 'react';
import { TokenContext } from '../TokenContext';

const useToken = () => {
  const [state, setState] = useContext(TokenContext);

  function getToken() {
    const token = localStorage.getItem('token');
    // return token;
    if (token) return token;
    return state.token;
  }

  function changeToken(token) {
    setState({ ...state, token });
    localStorage.setItem('token', token);
  }

  function clearToken() {
    setState({ ...state, token: null });
    localStorage.removeItem('token');
  }

  return {
    getToken,
    changeToken,
    clearToken,
  };
};

export default useToken;
