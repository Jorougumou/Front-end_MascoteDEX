import {View, Text, TouchableOpacity} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { NavigationProps } from "./TelaLogin"
import { useEffect } from "react"
import { obterUsuario } from "../services/Usuario"
import { Ionicons } from "@expo/vector-icons"
import { useAuth } from "../context/AuthContext"

export default function TelaMenu() {
    const {sair} = useAuth()

    const navigation = useNavigation<any>()

    useEffect(() => {
        const usuario = async() => {
            try {
                const resposta = await obterUsuario()
                console.log(resposta.perfil)
            } catch(error : any) {
                console.error(error.response?.data)
            }
        } 
        usuario()
    }, [])

    return(
        <View className="flex flex-1 justify-center items-center">
            <View className="flex items-center bg-orange-300 p-[40px] h-[60%]">
                <Text className="text-[50px]">ola</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Perfil")} 
                className="flex justify-center flex-row mt-[20px] bg-white p-[10px] w-[100px] 
                rounded-[20px] items-center gap-[35px]">
                    <Text className="text-[16px] text-black">Perfil</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={sair} className="flex flex-row mt-[20px] bg-white p-[10px] w-[100px] rounded-[20px] items-center gap-[35px]">
                    <Text className="text-[16px] text-black">Sair</Text>
                    <Ionicons name="exit" size={18} color={"black"}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}