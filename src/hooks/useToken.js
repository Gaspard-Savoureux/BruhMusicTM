import { useContext } from 'react';
import { TokenContext } from '../TokenContext';

const useToken = () => {
  const [state, setState] = useContext(TokenContext);

  function getToken() {
    return state.token;
  }

  function changeToken(token) {
    setState({ ...state, token });
  }
  return {
    getToken,
    changeToken,
  };
};

export default useToken;
