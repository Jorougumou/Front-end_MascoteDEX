import AuthNavigation from "./AuthNavigation";
import AppNavigation from "./AppNavigation";
import { NavigationContainer } from "@react-navigation/native";
import "../global.css"

import { useAuth } from "./context/AuthContext";

export function Rotas () {
    const {autenticado} = useAuth()

    return (
        <NavigationContainer>
            {autenticado ? <AppNavigation/> : <AuthNavigation/>}
        </NavigationContainer>
    )
}