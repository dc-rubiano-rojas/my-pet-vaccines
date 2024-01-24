import { Text, Button, StyleSheet, TextInput, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, addDoc, onSnapshot, query, where, getDocs } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../../firebaseConfig'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import styles from './login.style'
import { SafeAreaView, Image } from 'react-native';
import { COLORS, images } from '../../../constants'
import { TouchableOpacity, View } from 'react-native-ui-lib'
import LoginButton from '../../../components/common/buttons/LoginButton'
import { ScreenHeaderBtn } from '../../../components'
import { User } from '../../../utils/types';

const Login = ({ navigation }: any) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({ email: '', password: '' })

    const auth = FIREBASE_AUTH
    const db = FIRESTORE_DB

    const signIn = async () => {
        setLoading(true)

        const isUserInFirestore = await validationFirestore()

        if (!validateForm() && isUserInFirestore) {
            alert('Must be an error with your email')
            return
        }
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
    const register = () => {
        navigation.navigate('user-register')
    }

    const validationFirestore = async () => {
        const userRef = collection(FIRESTORE_DB, 'users')
        const messagesCollectionRef = query(userRef, where("email", "==", email));
        const data = await getDocs(messagesCollectionRef);
        const exist = data.docs.filter((doc) => doc.data().email === email)
        if (exist.length > 0) {
            return true
        }
        return false
        /*         onSnapshot(userRef, {
                    next: (snapshot) => {
                        console.log('SEARCHING');                
                        snapshot.docs.forEach((doc: any): any => {
                            
                            if (doc.uid === email) {
                                console.log('USER EXIST');
                                
                                setUserExist(true)
                            }
                        })
                    }
                }) */
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