import {Text, View, TextInput, TouchableOpacity } from 'react-native';
import { NavigationProps } from './TelaLogin';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { FazerCadastro } from '../services/Login';
import { useState } from 'react';

export default function TelaCadastro() {
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    const navigation = useNavigation<NavigationProps>()

    const Cadastro = async() => {
        try {
            const resposta = await FazerCadastro(nome, email, senha)
            navigation.navigate("Login")
            return resposta.data
        } catch(error : any) {
            console.error(error)
        }
    }

    return(
        <KeyboardAwareScrollView
        contentContainerStyle={{flexGrow : 1, justifyContent : 'center', paddingVertical : 30}} 
        keyboardShouldPersistTaps='handled'
        enableOnAndroid
        extraScrollHeight={30}
        >
            <View className="justify-center items-center">
                <View className="flex p-4 justify-center items-center mb-[30px]">
                    <Text className="text-[35px] my-[20px] text-[#F14C23] font-rubik">MascotDex</Text>
                    <Text className="text-[14px]">Faça o seu cadastro</Text>
                </View>
                <View className="flex w-[90%] gap-[30px]">
                    <View className="flex width-[80%] gap-[5px]">
                        <Text className="text-[#F14C23]">Nome</Text>
                        <TextInput value={nome} onChangeText={setNome} className="border-[1.5px] border-orange-300 w-[100%] rounded-[5px]"/>
                    </View>
                    <View className="flex width-[80%] gap-[5px]">
                        <Text className="text-[#F14C23]">Email</Text>
                        <TextInput 
                        value={email} 
                        onChangeText={setEmail} 
                        className="border-[1.5px] border-orange-300 w-[100%] rounded-[5px]"
                        />
                    </View>
                    <View>
                        <Text className="text-[#F14C23]">Senha</Text>
                        <TextInput 
                        value={senha} 
                        onChangeText={setSenha} 
                        className="border-[1.5px] border-orange-300 w-[100%] rounded-[5px]"/>
                    </View>
                    <View className="w-[100%] flex justify-center items-center mt-[20px]">
                        <TouchableOpacity onPress={Cadastro} className="py-[15px] bg-[#F14C23] w-[50%] justify-center items-center rounded-[10px] rounded-[20px]">
                            <Text className="text-[22px] text-white">Cadastrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}