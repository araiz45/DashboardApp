import React, {createContext, useContext, ReactNode, useState} from 'react'


export interface UserContextProps {
    username: string;
    id: string;
    admin: boolean;
    setUsername: (name: string) => void;
    setId: (id: string) => void;
    setAdmin: (admin: boolean) => void;
}

export const UserContext = createContext<UserContextProps | undefined > (undefined);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({children}) => {
    const [username, setUsername] = useState<string>('');
    const [id, setId] = useState<string>('');
    const [admin, setAdmin] = useState<boolean>(false);
    const contextValue: UserContextProps = {
        username, 
        id,
        admin,
        setUsername,
        setId,
        setAdmin
    }

    return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
}

export const useUser = () => {
    const context = useContext(UserContext);
    if(!context) {
        throw new Error ('useAuth must be used within an AuthProvider')
    }
    return context
}