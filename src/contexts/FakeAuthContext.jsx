import { createContext, useContext, useReducer } from 'react';

// Create the context
export const AuthContext = createContext();

// Create a custom hook to use the AuthContext
const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth was used outside the AuthProvider");
    }
    return context;
};

// Initial state
const initialState = {
    user: null,
    isAuthenticated: false,
    
};

// Reducer function
const authReducer = (state, action) => {
    switch (action.type) {
        case "login":
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true
            };
        case "logout":
            return {
                ...state,
                user: null,
                isAuthenticated: false
            };
        default:
            throw new Error('Unknown action type in authReducer');
    }
}

const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
  };

const AuthProvider = ({ children }) => {
    //const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [{user, isAuthenticated}, dispatch] = useReducer(authReducer, initialState);

    function login(email, password) {
        // API call to authenticate the user in real app
        if (email === FAKE_USER.email && password === FAKE_USER.password) {
            dispatch({ type: "login", payload: FAKE_USER });
        }
    }

    function logout() {
        // API call to logout the user in real app
        dispatch({ type: "logout" });
    }

    const contextValue = {
        user,
        isAuthenticated,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, useAuth };