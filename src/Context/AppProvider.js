import React, { createContext, useState } from "react";

export const AppContext = createContext(); // Creating the context

export default function AppProvider({ children }) {
    const [dataBc, setDataBc] = useState({});
    const [facultyData, setFacultyData] = useState({})

    return (
        <AppContext.Provider value={{ dataBc, setDataBc, facultyData, setFacultyData }}>
            {children}
        </AppContext.Provider>
    );
}
