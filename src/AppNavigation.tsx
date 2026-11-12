import TelaMascote from "./screens/TelaMascote"
import TelaRanking from "./screens/TelaRanking"
import TelaMenu from "./screens/TelaMenu"
import TelaEventos from "./screens/telaEventos"

import {Ionicons} from "@expo/vector-icons"
import {SafeAreaView} from "react-native-safe-area-context"
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { View, Text } from "react-native"


export default function AppNavigation() {
    const Tab = createMaterialTopTabNavigator();
    
    return(
        <SafeAreaView className="flex-1">
            <View className="px-[20px]">
                <Text className="text-[35px] font-DancingScript">
                    MascoteDex
                </Text>
            </View>
            <Tab.Navigator tabBarPosition="bottom" screenOptions={{
                tabBarShowLabel : false,
                tabBarStyle: {height : 55, backgroundColor : "#F14C23", justifyContent : "center", alignItems: "center"},
                tabBarItemStyle : {alignItems : "center"},
                tabBarIndicatorStyle : {display : "none"}
            }}>
                <Tab.Screen name="Mascote" component={TelaMascote} options={{ tabBarIcon : ({focused}) => (
                    <Ionicons name="paw" size={30} color={focused ? "black" : "white"} />
                )}} 
                />
                <Tab.Screen name="Ranking" component={TelaRanking}options={{tabBarIcon : ({focused}) => (
                    <Ionicons name="trophy" size={30} color={focused ? "black" : "white"} />
                )}} />
                <Tab.Screen name="Eventos" component={TelaEventos} options={{tabBarIcon : ({focused}) => (
                    <Ionicons name="calendar" size={30} color={focused ? "black" : "white"}/>
                )}}/>
                <Tab.Screen name="Menu" component={TelaMenu} options={{tabBarIcon : ({focused}) => (
                    <Ionicons name="menu" size={30} color={focused ? "black" : "white"} />
                )}} />
            </Tab.Navigator>
        </SafeAreaView>
    )

}