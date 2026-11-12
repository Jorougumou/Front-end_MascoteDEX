import {Text, View, TextInput, TouchableOpacity, Keyboard} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import React, { useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import {NativeStackNavigationProp} from "@react-navigation/native-stack"
import { AuthParamsList } from '../types/navitagion';
import { FazerLogin } from '../services/Login';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export type NavigationProps = NativeStackNavigationProp<AuthParamsList>

export default function TelaLogin(){
    const [Email, setEmail] = useState("")
    const [Senha, setSenha] = useState("")

    const [visivel, setVisivel] = useState<boolean>(true)

    const {entrar} = useAuth()

    const senhaRef = useRef<React.ElementRef<typeof TextInput>>(null)

    const navigation = useNavigation<NavigationProps>()

    const login = async () => {
        try {
            const resposta = await FazerLogin({email : Email, senha : Senha})
            await entrar(resposta.token)
        } catch(error : any) {
            console.error("Erro completo:", error);
            console.error("Mensagem:", error.mensage);
            console.log("Resposta da API:", error.response?.data);
            console.log("Código HTTP:", error.response?.status);
        }
    }    
    return(
        <KeyboardAwareScrollView 
        contentContainerStyle={{flexGrow : 1, justifyContent : 'center', paddingVertical : 30}} 
        keyboardShouldPersistTaps='handled'
        enableOnAndroid
        extraScrollHeight={30}
        >
            <View className='justify-center items-center'>
                <View className="flex p-4 justify-center items-center mb-[50px]">
                    <Text className="text-[35px] my-[20px] text-[#F14C23] font-rubik">MascotDex</Text>
                    <Text className="text-[14px]">Efetue seu login</Text>
                </View>
                <View className="flex w-[90%] gap-[30px]">
                    <View className="flex width-[80%] gap-[5px]">
                        <Text className="text-[#F14C23]">Email</Text>
                        <TextInput
                        value={Email}
                        returnKeyType='next'
                        onSubmitEditing={() => senhaRef.current?.focus()}
                        onChangeText={setEmail}
                        className="border-[1.5px] border-orange-300 w-[100%] rounded-[5px]"
                        />
                    </View>
                    <View>
                        <Text className="text-[#F14C23]">Senha</Text>
                        <View className='flex flex-row items-center'>
                            <TextInput
                            ref={senhaRef}
                            value={Senha}
                            onChangeText={setSenha}
                            returnKeyType='done'
                            secureTextEntry={visivel}
                            className="border-[1.5px] border-orange-300 w-[100%] rounded-[5px]"
                            onSubmitEditing={() => Keyboard.dismiss()}
                            />
                            <TouchableOpacity className='absolute right-0 mr-[15px]' onPress={() => setVisivel(!visivel)}>
                                <Ionicons name={visivel ? 'eye-off-outline' :  'eye-outline'} size={25}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className="flex flex-row items-center justify-between">
                        <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
                            <Text className="text-[12px]">Não tem uma conta</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text className="text-[12px]">Esqueceu sua senha?</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="w-[100%] flex justify-center items-center mt-[20px]">
                        <TouchableOpacity onPress={login} className="py-[15px] bg-[#F14C23] w-[50%] justify-center items-center rounded-[10px] rounded-[20px]">
                            <Text className="text-[22px] text-white">Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAwareScrollView>
    )

}