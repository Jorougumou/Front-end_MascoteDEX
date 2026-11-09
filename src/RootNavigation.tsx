import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AppNavigation from "./AppNavigation";
import TelaEventos from "./screens/telaEventos"
import TelaPerfil from "./screens/TelaPerfil";
import DetalheMascote from "./screens/telaDetalhesMascote";

export default function RootNavigation () {
    const tab = createNativeStackNavigator()

    return (
        <tab.Navigator screenOptions={{headerShown : false}}>
            <tab.Screen name="HomeTabs" component={AppNavigation}/>
            <tab.Screen name="Eventos" component={TelaEventos}/>
            <tab.Screen name="Perfil" component={TelaPerfil}/>
            <tab.Screen name="DetalheMascote" component={DetalheMascote}/>
        </tab.Navigator>
    )
}