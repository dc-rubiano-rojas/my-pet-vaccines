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
    const [errors, setErrors] = useState({ email: '', password: '' })

    const auth = FIREBASE_AUTH
    const signIn = async () => {
        console.log('validateForm: ', validateForm());

        if (validateForm()) {

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
    }
    const register = () => {
        navigation.navigate('user-register')
    }

    const validateForm = () => {
        let errors = { email: '', password: '' };

        if (!email) errors.email = 'Email is required'
        if (!password) errors.password = 'Password is required'

        setErrors(errors);
        return !!!errors.email && !!!errors.password
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
                {errors.email ? (
                    <Text style={styles.errorText}>{errors.email}</Text>
                ) : null}
                <TextInput secureTextEntry={true} style={styles.input} placeholder='Password' autoCapitalize='none' onChangeText={(text) => setPassword(text)} />
                {errors.password ? (
                    <Text style={styles.errorText}>{errors.password}</Text>
                ) : null}
                {loading ? <ActivityIndicator size='large' color='#0000ff' /> :
                    <>
                        <View style={styles.containerButtons}>
                            <LoginButton
                                handleOnPress={signIn}
                                title={'Sign In'}
                            />
                            <LoginButton
                                handleOnPress={register}
                                title={'Sign Up'}
                            />
                            <Text style={styles.forgotPasswordText}>Forgot password?</Text>

                        </View>
                        <Image source={images.googleLogo} style={styles.logoGoogle}
                            resizeMode="contain"
                        />
                    </>
                }
            </View>



        </SafeAreaView>

    )
}



export default Login