const { createContext, useReducer } = require("react");

// http
import { signUpHTTP, loginHTTP } from "../util/http";

export const AuthContext = createContext({
    idToken: null,
    email: "",
    expireIn: null,
});

const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN" || "SIGNUP":
            return {
                idToken: action.payload.idToken,
                email: action.payload.email,
                expireIn: action.payload.expireIn,
            };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, {
        email: "",
        idToken: "",
        expireIn: null,
    });

    const loginAction = async (email, password) => {
        const result = await loginHTTP(email, password);
        dispatch({
            type: "LOGIN",
            payload: {
                email: result.email,
                idToken: result.idToken,
                expiresIn: result.expiresIn,
            },
        });
    };

    const signUpAction = async (email, password) => {
        const result = await signUpHTTP(email, password);
        dispatch({
            type: "SIGNUP",
            payload: {
                email: result.email,
                idToken: result.idToken,
                expireIn: result.expireIn,
            },
        });
    };

    const value = {
        idToken: state.idToken,
        email: state.email,
        expireIn: state.expireIn,
        loginAction: loginAction,
        signUpAction: signUpAction,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
