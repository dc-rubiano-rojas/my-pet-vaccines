import { Text, Button, StyleSheet, TextInput, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { FIREBASE_AUTH } from '../../../firebaseConfig'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import styles from './login.style'
import { SafeAreaView, Image } from 'react-native';
import { COLORS, images } from '../../../constants'
import { TouchableOpacity, View } from 'react-native-ui-lib'
import LoginButton from '../../../components/common/buttons/LoginButton'
import { ScreenHeaderBtn } from '../../../components'

const Login = ({ navigation }: any) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const auth = FIREBASE_AUTH
    const signIn = async () => {
        console.log('signin')

        setLoading(true)
        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
            console.log(response);
        } catch (error: any) {
            console.log(error);
            alert('Sign in failed: ' + error.message)
        } finally {
            setLoading(false)
        }
    }
    const register = async () => {
        navigation.navigate('user-register')
        /* 
                setLoading(true)
                try {
                    const response = await createUserWithEmailAndPassword(auth, email, password)
                    console.log(response);
                } catch (error: any) {
                    console.log(error);
                    alert('register in failed: ' + error.message)
                } finally {
                    setLoading(false)
                    //navigation.navigate('Home')
                } */
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.headerContainer}>
                <Image source={images.logoPet2} style={styles.logoImage}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Login</Text>
                <TextInput style={styles.input} placeholder='Email' autoCapitalize='none' onChangeText={(text) => setEmail(text)} />
                <TextInput secureTextEntry={true} style={styles.input} placeholder='Password' autoCapitalize='none' onChangeText={(text) => setPassword(text)} />
                {loading ? <ActivityIndicator size='large' color='#0000ff' /> :
                    <>
                        <View style={styles.containerButtons}>
                            <LoginButton
                                handleOnPress={signIn}
                                title={'Sign In'}
                            />
                            <LoginButton
                                handleOnPress={register}
                                title={'Register'}
                            />

                        </View>
                    </>
                }
            </View>



        </SafeAreaView>

    )
}



export default Login