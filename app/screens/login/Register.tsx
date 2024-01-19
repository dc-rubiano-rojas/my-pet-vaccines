import React, { useState } from 'react'
import { useController, useForm } from 'react-hook-form'
import { Text, TextInput, ActivityIndicator, Button } from 'react-native'
import { FIREBASE_AUTH } from '../../../firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { SafeAreaView, Image } from 'react-native';
import { COLORS, images } from '../../../constants'
import { TouchableOpacity, View } from 'react-native-ui-lib'
import LoginButton from '../../../components/common/buttons/LoginButton'
import { ScreenHeaderBtn } from '../../../components'
import styles from './register.style';

type DataForm = {
  Name: string
  Lastname: string
  Email: string
  'Confirm Email': string
  Password: string
  'Confirm Password': string
};

const Register = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false)
  const { control, handleSubmit } = useForm()
  const [errors, setErrors] = useState({ email: '', password: '', name: '' })
  const auth = FIREBASE_AUTH


  const validateForm = (data: DataForm | any) => {
    let errors = { email: '', password: '', name: '' };

    const isEmailValid = (data.Email === data['Confirm Email']) && data.Email && data['Confirm Email']
    if (!isEmailValid) errors.email = 'Email does not match'

    const isPasswordValid = (data.Password === data['Confirm Password']) && data.Password && data['Confirm Password']
    if (!isPasswordValid) errors.password = 'Password does not match'

    if (!data.Name) errors.name = 'Name is required'
    setErrors(errors);

    return !!!errors.email && !!!errors.password && !!!errors.name
  }

  const registerNewUser = async (data: DataForm | any) => {

    if (validateForm(data)) {
      setLoading(true)
      try {
        const response = await createUserWithEmailAndPassword(auth, data.Email, data.Password)
        console.log(response);
      } catch (error: any) {
        console.log(error);
        alert('register in failed: ' + error.message)
      } finally {
        setLoading(false)
        //navigation.navigate('Home')
      }
    }

  }

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
        <Input name='Name' control={control} />
        {errors.name ? (
          <Text style={styles.errorText}>{errors.name}</Text>
        ) : null}
        <Input name='Lastname' control={control} />
        <Input name='Email' control={control} />
        <Input name='Confirm Email' control={control} />
        {errors.email ? (
          <Text style={styles.errorText}>{errors.email}</Text>
        ) : null}
        <Input name='Password' control={control} secureTextEntry={true} />
        <Input name='Confirm Password' control={control} secureTextEntry={true} />
        {errors.password ? (
          <Text style={styles.errorText}>{errors.password}</Text>
        ) : null}

        {loading ? <ActivityIndicator size='large' color='#0000ff' /> :
          <>
            <View style={styles.containerButtons}>
              <LoginButton
                handleOnPress={handleSubmit(registerNewUser)}
                title={'Submit'}
              />
            </View>
          </>
        }
      </View>
    </SafeAreaView>

  )
}

export default Register



const Input = ({ name, control }: any) => {
  const { field } = useController({
    control,
    defaultValue: '',
    name
  })
  return (
    <TextInput style={styles.input} placeholder={name} autoCapitalize='none' value={field.value} onChangeText={field.onChange} />
  )
}
