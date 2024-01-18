import React, { useState } from 'react'
import { Text, TextInput, ActivityIndicator } from 'react-native'
import { FIREBASE_AUTH } from '../../../firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { SafeAreaView, Image } from 'react-native';
import { COLORS, images } from '../../../constants'
import { TouchableOpacity, View } from 'react-native-ui-lib'
import LoginButton from '../../../components/common/buttons/LoginButton'
import { ScreenHeaderBtn } from '../../../components'
import styles from './register.style';


const Register = ({ navigation }: any) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')
        } style={styles.logoButton}>

          <Image source={images.logoPet2} style={styles.logoImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Register</Text>
        <TextInput style={styles.input} placeholder='Name' autoCapitalize='none' onChangeText={(text) => setEmail(text)} />
        <TextInput style={styles.input} placeholder='Lastname' autoCapitalize='none' onChangeText={(text) => setEmail(text)} />
        <TextInput style={styles.input} placeholder='Email' autoCapitalize='none' onChangeText={(text) => setEmail(text)} />
        <TextInput style={styles.input} placeholder='Confirm Email' autoCapitalize='none' onChangeText={(text) => setEmail(text)} />
        <TextInput secureTextEntry={true} style={styles.input} placeholder='Password' autoCapitalize='none' onChangeText={(text) => setPassword(text)} />
        <TextInput secureTextEntry={true} style={styles.input} placeholder='Confirm Password' autoCapitalize='none' onChangeText={(text) => setPassword(text)} />
        {loading ? <ActivityIndicator size='large' color='#0000ff' /> :
          <>
            <View style={styles.containerButtons}>

            </View>
          </>
        }
      </View>
    </SafeAreaView>

  )
}

export default Register

