import React, { useState, createContext } from 'react';

export const ListingResponseContext = createContext();

function ContextShare({ children }) {
  const [listingsData, setListingsData] = useState({});

  return (
    <ListingResponseContext.Provider value={{ listingsData, setListingsData }}>
      {children}
    </ListingResponseContext.Provider>
  );
}
 
export default ContextShare;
