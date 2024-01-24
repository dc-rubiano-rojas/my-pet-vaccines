import { View, Text, SafeAreaView, TextInput, ActivityIndicator, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import styles from './pet-register.style'
import { COLORS, images } from '../../../constants'
import { ScreenHeader } from '../../../components'
import { Input } from '../login/Register';
import LoginButton from '../../../components/common/buttons/LoginButton';
import { useForm } from 'react-hook-form';

const PetRegister = ({ navigation }: any) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({ email: '', password: '' })
  const { control, handleSubmit } = useForm()
  const handleButton = async () => {


  }

  return (
    <SafeAreaView style={styles.container}>

      <ScreenHeader title={'Pet Register'} />


      <FontAwesome5 name='user-circle' color={COLORS.primary} style={styles.loginText} size={80} />
      <View style={styles.formProfileContainer}>
        <View style={styles.inputsContainer}>

          <Input name='Name' control={control} />
          <Input name='Age' control={control} />
          <Input name='Gender' control={control} />
          <Input name='Weight' control={control} />
          <Input name='Breed' control={control} />
          <Input name='Color' control={control} />
          <Input name='Height' control={control} />
          <LoginButton
            handleOnPress={handleSubmit(handleButton)}
            title={'Create'}
          />
        </View>
      </View>



    </SafeAreaView>
  )
}

export default PetRegister