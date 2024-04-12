import { createContext, useContext, useEffect, useState } from 'react';
import { logout, onUserStateChange, login } from '../api/firebase';

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState();

    useEffect(() => {
        onUserStateChange((user) => {
            setUser(user);
        });
    }, []);

    return <AuthContext.Provider value={{ user, uid: user && user.uid, login, logout }}>
        {children}
    </AuthContext.Provider>
}

export function useAuthContent() {
    return useContext(AuthContext);
}