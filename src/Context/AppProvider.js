import React, { createContext, useState } from "react";

export const AppContext = createContext(); // Creating the context

export default function AppProvider({ children }) {
    const [dataBc, setDataBc] = useState({});

    return (
        <AppContext.Provider value={{ dataBc, setDataBc }}>
            {children}
        </AppContext.Provider>
    );
}
