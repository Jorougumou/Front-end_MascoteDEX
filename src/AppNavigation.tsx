import TelaMascote from "./screens/TelaMascote"
import TelaRanking from "./screens/TelaRanking"
import TelaMenu from "./screens/TelaMenu"

import {Ionicons} from "@expo/vector-icons"

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';


export default function AppNavigation() {
    const Tab = createMaterialTopTabNavigator();
    
    return(
        <Tab.Navigator tabBarPosition="bottom" screenOptions={{
            tabBarShowLabel : false,
            tabBarStyle: {height : 80, backgroundColor : "#F14C23", justifyContent : "center", alignItems: "center"},
            /* tabBarLabelStyle: {fontSize : 16, color : "white", width : "90%", textAlign : "center", alignItems : "center", justifyContent: "center"}, */
            tabBarItemStyle : {alignItems : "center"},
            tabBarIndicatorStyle : {display : "none"}
        }}>
            <Tab.Screen name="Mascote" component={TelaMascote} options={{tabBarIcon : ({focused}) => (
                <Ionicons name="paw" size={30} color={focused ? "black" : "white"} />
            )}} />
            <Tab.Screen name="Ranking" component={TelaRanking}options={{tabBarIcon : ({focused}) => (
                <Ionicons name="trophy" size={30} color={focused ? "black" : "white"} />
            )}} />
            <Tab.Screen name="Menu" component={TelaMenu} options={{tabBarIcon : ({focused}) => (
                <Ionicons name="menu" size={30} color={focused ? "black" : "white"} />
            )}} />
        </Tab.Navigator>
    )

}