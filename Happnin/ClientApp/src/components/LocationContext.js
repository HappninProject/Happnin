import React, { createContext, useState } from "react";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
    const [lat, setLat] = useState(0);
    const [long, setLong] = useState(0);

    return (
        <LocationContext.Provider
          value={{
            lat,
            long,
            setLat,
            setLong
          }}
        >
          {children}
        </LocationContext.Provider>
      );
};