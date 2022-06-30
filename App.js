import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

// screens
import AuthScreen from "./screens/AuthScreen";
import WelcomeScreen from "./screens/WelcomeScreen";

// styles
import { Colors } from "./constants/styles";

// context
import { AuthProvider, AuthContext } from "./store/auth-context";
import { useContext } from "react";

const Stack = createNativeStackNavigator();

function AuthStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: Colors.primary500 },
                headerTintColor: "white",
                contentStyle: { backgroundColor: Colors.primary100 },
            }}
        >
            <Stack.Screen name="AuthScreen" component={AuthScreen} />
        </Stack.Navigator>
    );
}

function AuthenticatedStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: Colors.primary500 },
                headerTintColor: "white",
                contentStyle: { backgroundColor: Colors.primary100 },
            }}
        >
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
        </Stack.Navigator>
    );
}

function Navigation() {
    const authContext = useContext(AuthContext);
    return (
        <NavigationContainer>
            {authContext.idToken ? <AuthenticatedStack /> : <AuthStack />}
        </NavigationContainer>
    );
}

export default function App() {
    return (
        <>
            <StatusBar style="light" />
            <AuthProvider>
                <Navigation />
            </AuthProvider>
        </>
    );
}
