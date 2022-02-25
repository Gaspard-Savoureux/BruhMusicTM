import React, { useState } from 'react';

const TokenContext = React.createContext();

const TokenContextProvider = (props) => {
  const [token, setToken] = useState('');
  // const storedToken = localStorage.getItem('Token');

  const objetEtMethodesDuContexte = [token, setToken];
  return (
    <TokenContext.Provider value={objetEtMethodesDuContexte}>
      {props.children}
    </TokenContext.Provider>
  );
};

export { TokenContext, TokenContextProvider };
