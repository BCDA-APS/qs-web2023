import React, { useState, useContext } from "react";

//Context that would be used to set the timer for the api calls for the console
const ConfigContext = React.createContext();

export const initialConsoleConfig = {console: 3};

export const ConfigProvider = ({ children }) => {
    const [ consoleConfig, setConsoleConfig ] = useState(initialConsoleConfig);
    return (
        <ConfigContext.Provider 
        value={{consoleConfig,
         updateConsoleConfig: setConsoleConfig,}}>
            {children}
        </ConfigContext.Provider>
    );
};

export const useConsoleConfig = () => {
    const { consoleConfig, updateConsoleConfig } = useContext(ConfigContext);

    return {consoleConfig, updateConsoleConfig};
};