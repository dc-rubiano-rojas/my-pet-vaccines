import React, { useState } from 'react'
import { useController, useForm } from 'react-hook-form'
import { Text, TextInput, ActivityIndicator, Button } from 'react-native'
import { addDoc, collection } from 'firebase/firestore'
import { Formik } from 'formik';
import * as Yup from 'yup';

import { FIREBASE_AUTH, FIRESTORE_DB } from '../../../firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { SafeAreaView, Image } from 'react-native';
import { COLORS, images } from '../../../constants'
import { TouchableOpacity, View } from 'react-native-ui-lib'
import CustomButton from '../../../components/common/buttons/CustomButton'
import { ScreenHeaderBtn } from '../../../components'
import styles from './register.style';
import { DataFormMyType, User } from '../../../utils/types';

const Register = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false)
  const auth = FIREBASE_AUTH

  const registerNewUser = async (data: DataFormMyType | any) => {
    setLoading(true)
    try {
      const response = await createUserWithEmailAndPassword(auth, data.Email, data.Password)
      // FIXME: add datos del form
      const userToSave: User = response.user.providerData[0]
      await addDoc(collection(FIRESTORE_DB, 'users'), { ...userToSave })

    } catch (error: any) {
      console.log(error);
      alert('register in failed: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const ResgisterUserSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Name is required'),
  });

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

        <Formik
          initialValues={{
            name: '',
            lastname: '',
            email: '',
            confirmEmail: '',
            password: '',
            confirmPassword: '',
            contactNumber: '',
          }}
          validationSchema={ResgisterUserSchema}
          onSubmit={registerNewUser}
        >
          {({
            values,
            errors,
            touched,
            handleSubmit,
            handleChange,
            setFieldTouched,
            isValid
          }): any => (
            <>
              <TextInput placeholder='Name' style={styles.input} value={values.name}
                onChangeText={handleChange('name')}
                onBlur={() => setFieldTouched('name')} />
              {errors.name ? (
                <Text style={styles.errorText}>{errors.name}</Text>
              ) : null}

              <TextInput placeholder='Lastname' style={styles.input} value={values.lastname}
                onChangeText={handleChange('lastname')}
                onBlur={() => setFieldTouched('lastname')} />
              {errors.lastname ? (
                <Text style={styles.errorText}>{errors.lastname}</Text>
              ) : null}

              <TextInput placeholder='Email' style={styles.input} value={values.email}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')} />
              {errors.email ? (
                <Text style={styles.errorText}>{errors.email}</Text>
              ) : null}

              <TextInput placeholder='Confirm Email' style={styles.input} value={values.confirmEmail}
                onChangeText={handleChange('confirmEmail')}
                onBlur={() => setFieldTouched('confirmEmail')} />
              {errors.confirmEmail ? (
                <Text style={styles.errorText}>{errors.confirmEmail}</Text>
              ) : null}

              <TextInput placeholder='Password' style={styles.input} value={values.confirmEmail}
                onChangeText={handleChange('password')}
                onBlur={() => setFieldTouched('password')} />
              {errors.password ? (
                <Text style={styles.errorText}>{errors.password}</Text>
              ) : null}

              <TextInput placeholder='Confirm Password' style={styles.input} value={values.confirmEmail}
                onChangeText={handleChange('confirmPassword')}
                onBlur={() => setFieldTouched('confirmPassword')} />
              {errors.confirmPassword ? (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              ) : null}

              <TextInput placeholder='Contact Number' style={styles.input} value={values.confirmEmail}
                onChangeText={handleChange('contactNumber')}
                onBlur={() => setFieldTouched('contactNumber')} />
              {errors.contactNumber ? (
                <Text style={styles.errorText}>{errors.contactNumber}</Text>
              ) : null}

              {loading ? <ActivityIndicator size='large' color='#0000ff' /> :
                <>
                  <View style={styles.containerButtons}>
                    <CustomButton
                      handleOnPress={handleSubmit}
                      title={'Submit'}
                    />
                  </View>
                </>
              }
            </>
          )}

        </Formik>



      </View>
      
    </SafeAreaView>

  )
}



export default Register
