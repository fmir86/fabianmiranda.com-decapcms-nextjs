import { createContext, useContext, useState, useCallback, ReactNode } from "react";

const MainContext = createContext();

export const MainProvider = ({ children }) => {

  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = useCallback(() => {
    setShowPopup( (previousValue) => !previousValue );
  }, []);

  return (
    <MainContext.Provider value={{ showPopup, togglePopup }}>
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error("useMainContext must be used within a MainProvider");
  }
  return context;
};
