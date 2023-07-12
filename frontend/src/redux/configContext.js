import React, { useState, useContext } from "react";

const ConfigContext = React.createContext();

export const initialConsoleConfig = {console: 3};

export const ConfigProvider = ({ children }) => {
    const [ consoleConfig, setConsoleConfig ] = useState(initialConsoleConfig);
    console.log("con: ", consoleConfig);
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