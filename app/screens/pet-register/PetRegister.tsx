import { View, Text, SafeAreaView, TextInput, ActivityIndicator, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import styles from './pet-register.style'
import { images } from '../../../constants'

const PetRegister = ({ navigation }: any) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({ email: '', password: '' })

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')
        } style={styles.logoButton}>
          <Text style={styles.headerText}>Register a pet</Text>
        </TouchableOpacity>

      </View>

      <View style={styles.formContainer}>

      </View>



    </SafeAreaView>
  )
}

export default PetRegister