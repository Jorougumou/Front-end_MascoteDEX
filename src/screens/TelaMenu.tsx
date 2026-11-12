import {View, Text, TouchableOpacity, Image} from "react-native"
import { useNavigation } from "@react-navigation/native"
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
            <View className="flex items-center bg-[#F14C23] w-[80%] h-[90%]">
                <View className="items-center mt-[10%]">
                    <Image className="w-[200px] h-[100px]"
                    source={require('../Components/image/logo.jpg')}
                    resizeMode="cover"
                    />
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
        </View>
    )
}