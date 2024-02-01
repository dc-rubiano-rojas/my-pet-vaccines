import { View, Button, StyleSheet, TextInput, ActivityIndicator, KeyboardAvoidingView, SafeAreaView, Image, Text, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-ui-lib';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Yup from 'yup';

import styles from './user-profile.style'
import { COLORS, icons, images } from '../../../constants'
import { FIREBASE_AUTH } from '../../../firebaseConfig';
import { useForm } from 'react-hook-form';
import CustomButton from '../../../components/common/buttons/CustomButton';
import { ScreenHeader } from '../../../components';
import { Formik } from 'formik';

const Profile = () => {
  const { control, handleSubmit } = useForm()
  const handleButton = async () => {


  }

  const registerNewUser = async (data: any) => {

  }

  const ResgisterUserSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Name is required'),
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>

      <View style={styles.container}>


        <ScreenHeader title={'Profile'} />

        <View style={styles.registerContainer}>

          <TouchableOpacity style={styles.dogContainer}>
            {/*           <FontAwesome6 name='bone' color={COLORS.tertiary} size={80} />
          <FontAwesome6 name='bone' color={COLORS.tertiary} size={80} /> */}
            {/*           <Text style={styles.loginText}>Hey, Daniel</Text>
 */}
          </TouchableOpacity>

          <View style={styles.formProfileContainer}>

            <View style={styles.inputsContainer}>
              <FontAwesome5 name='user-circle' color={COLORS.primary} style={styles.loginText} size={80} />

              <Formik
                initialValues={{
                  name: '',
                  lastname: '',
                  email: '',
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
                      onChangeText={handleChange('contactNumber')}
                      onBlur={() => setFieldTouched('contactNumber')} />
                    <TextInput placeholder='Lastname' style={styles.input} value={values.lastname}
                      onChangeText={handleChange('contactNumber')}
                      onBlur={() => setFieldTouched('contactNumber')} />
                    <TextInput placeholder='Email' style={styles.input} value={values.email}
                      onChangeText={handleChange('contactNumber')}
                      onBlur={() => setFieldTouched('contactNumber')} />

                  </>
                )}

              </Formik>

              <CustomButton
                handleOnPress={handleSubmit(handleButton)}
                title={'Edit'}
              />

            </View>



          </View>

          <TouchableOpacity onPress={async () => await FIREBASE_AUTH.signOut()
          } style={styles.logoutButton}>
            <AntDesign name='logout' color={'red'} size={55} />
          </TouchableOpacity>


        </View>


      </View>

    </SafeAreaView>
  )
}

export default Profile