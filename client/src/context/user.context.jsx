import React, {useContext,createContext,useState , useEffect} from 'react'

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user , setUser] = useState(null);

    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}