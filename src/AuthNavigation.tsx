import {createNativeStackNavigator} from "@react-navigation/native-stack"
import { AuthParamsList } from "./types/navitagion"
import { AuthProvider, useAuth } from "./context/AuthContext"

import TelaLogin from "./screens/TelaLogin"
import TelaCadastro from "./screens/TelaCadastro"

export default function AuthNavigation() {
    const Tab = createNativeStackNavigator<AuthParamsList>()



    return(
        <Tab.Navigator>
            <Tab.Screen name="Login" component={TelaLogin}/>
            <Tab.Screen name="Cadastro" component={TelaCadastro}/>
        </Tab.Navigator>
    )
}