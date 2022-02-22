import { useContext } from 'react';
import { TokenContext } from '../TokenContext';

const useToken = () => {
  const [state, setState] = useContext(TokenContext);

  function getToken() {
    return state.token;
  }

  function changeToken(token) {
    setState({ ...state, token });
    // localStorage.setItem('Token', token);
  }

  function clearToken() {
    setState({ ...state, token: '' });
    // localStorage.removeItem('Token');
  }

  return {
    getToken,
    changeToken,
    clearToken,
  };
};

export default useToken;
