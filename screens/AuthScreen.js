import { useContext } from "react";

// comps
import AuthContent from "../components/Auth/AuthContent";

// context
import { AuthContext } from "../store/auth-context";

function AuthScreen({ route }) {
    const authContext = useContext(AuthContext);

    const onAuthenticate = (email, password, isLogin) => {
        if (isLogin === true) {
            authContext.loginAction(email, password);
        } else {
            authContext.signUpAction(email, password);
        }
    };

    return (
        <AuthContent
            isLogin={
                route.params?.isLogin === undefined
                    ? true
                    : route.params?.isLogin
            }
            onAuthenticate={onAuthenticate}
        />
    );
}

export default AuthScreen;
