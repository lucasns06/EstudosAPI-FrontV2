import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userSalvo = localStorage.getItem('userData');
        if (userSalvo) {
            setUser(JSON.parse(userSalvo));
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
export const useUser = () => useContext(UserContext);