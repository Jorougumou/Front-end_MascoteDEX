import AuthNavigation from "./AuthNavigation";
import AppNavigation from "./AppNavigation";
import RootNavigation from "./RootNavigation";
import { NavigationContainer } from "@react-navigation/native";
import "../global.css"

import { useAuth } from "./context/AuthContext";

export function Rotas () {
    const {autenticado} = useAuth()

    return (
        <NavigationContainer>
            {autenticado ? <RootNavigation/> : <AuthNavigation/>}
        </NavigationContainer>
    )
}