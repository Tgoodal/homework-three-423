import React from "react";

const GlobalContext = React.createContext();

export const GlobalProvider = GlobalContext.Provider;


export default function UseGlobalValues(){
    return React.useContext(GlobalContext);
}


