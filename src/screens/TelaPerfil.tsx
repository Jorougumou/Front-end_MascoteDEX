import {View, Text, TouchableOpacity} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { NavigateParamsList } from "../types/navitagion"


export default function TelaPerfil() {

    type NavigationProps = NativeStackNavigationProp<NavigateParamsList>

    const navigation = useNavigation<NavigationProps>()

    return(
        <View className="flex-1">
            <View className="flex w-[100%] h-[10%] mt-[50px] justify-center items-end">
                <TouchableOpacity onPress={() => navigation.navigate("Eventos")} className="p-[10px] bg-red-600 mr-[25px] rounded-[20px]">
                    <Text className="text-white"> Eventos</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}