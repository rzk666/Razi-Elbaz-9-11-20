import React, { useContext, useState } from 'react';

const DarkModeContext = React.createContext();
const UpdateDarkMode = React.createContext();

export const useDarkMode = () => useContext(DarkModeContext);

export const useToggleDarkMode = () => useContext(UpdateDarkMode);

const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <DarkModeContext.Provider value={darkMode}>
      <UpdateDarkMode.Provider value={toggleDarkMode}>
        {children}
      </UpdateDarkMode.Provider>
    </DarkModeContext.Provider>
  );
};

export default DarkModeProvider;
