import {Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function TelaCadastro() {

    return(
        <View className="flex flex-1 justify-center items-center">
            <View className="flex p-4 justify-center items-center mb-[30px]">
                <Text className="text-[35px] my-[20px] text-[#F14C23] font-rubik">MascotDex</Text>
                <Text className="text-[14px]">Faça o seu cadastro</Text>
            </View>
            <View className="flex w-[90%] gap-[30px]">
                <View className="flex width-[80%] gap-[5px]">
                    <Text className="text-[#F14C23]">Email</Text>
                    <TextInput className="border-[1.5px] border-orange-300 w-[100%] rounded-[5px]"/>
                </View>
                <View>
                    <Text className="text-[#F14C23]">Senha</Text>
                    <TextInput className="border-[1.5px] border-orange-300 w-[100%] rounded-[5px]"/>
                </View>
                <View>
                    <Text className="text-[#F14C23]">Confirme sua Senha</Text>
                    <TextInput className="border-[1.5px] border-orange-300 w-[100%] rounded-[5px]"/>
                </View>
                <View className="w-[100%] flex justify-center items-center mt-[20px]">
                    <TouchableOpacity className="py-[15px] bg-[#F14C23] w-[50%] justify-center items-center rounded-[10px] rounded-[20px]">
                        <Text className="text-[22px] text-white">Cadastrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}