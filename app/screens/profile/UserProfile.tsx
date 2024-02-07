import { View, Button, StyleSheet, TextInput, ActivityIndicator, KeyboardAvoidingView, SafeAreaView, Image, Text, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-ui-lib';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Yup from 'yup';

import styles from './user-profile.style'
import { COLORS, icons, images } from '../../constants'
import { FIREBASE_AUTH } from '../../../firebaseConfig';
import { useForm } from 'react-hook-form';
import CustomButton from '../../components/common/buttons/CustomButton';
import { ScreenHeader } from '../../components';
import { Formik } from 'formik';
import useUserStore from '../../services/state/zustand/user-store';
import { logoutService, updateUser } from '../../services/api/user-service';
import { ToastType } from '../../utils/types';
import showToast from '../../utils/common-toasts';

const Profile = () => {
  const { name, email, contactNumber, lastname, uid, deleteUser } = useUserStore()
  const [loading, setLoading] = useState(false)

  const editUser = async (data: any) => {
    try {
      data.uid = uid;
      console.log('====================================');
      console.log('data');
      console.log(data);
      console.log('====================================');
      await updateUser(data)
      showToast(ToastType.success, 'Usuario has been updated', 'Succesfully!')
    } catch (error) {
      showToast(ToastType.error, 'There is an error to update', 'Contact client service!')
    }
  }
  const handleLogout = async (data: any) => {
    try {
      console.log('====================================');
      console.log('HANDLE LOGOUT');
      console.log('====================================');
      await logoutService()
      deleteUser()
    } catch (error) {
      console.log('====================================');
      console.log('ERROR LOGOUT');
      console.log(error);
      console.log('====================================');
    }
  }

  const UserSchemaValidation = Yup.object().shape({
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
                  name: name,
                  lastname: lastname,
                  email: email,
                  contactNumber: contactNumber,
                }}
                validationSchema={UserSchemaValidation}
                onSubmit={editUser}
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
                    <TextInput placeholder={'Name'}
                      style={styles.input}
                      value={values.name}
                      onChangeText={handleChange('name')}
                      onBlur={() => setFieldTouched('name')} />

                    <TextInput placeholder='Lastname'
                      style={styles.input}
                      value={values.lastname}
                      onChangeText={handleChange('lastname')}
                      onBlur={() => setFieldTouched('lastname')} />

                    <TextInput placeholder='Email' style={styles.input}
                      onChangeText={handleChange('email')}
                      onBlur={() => setFieldTouched('email')}
                      value={values.email}
                      editable={false} />

                    <TextInput placeholder={'Contact Number'}
                      style={styles.input}
                      value={values.contactNumber}
                      onChangeText={handleChange('contactNumber')}
                      onBlur={() => setFieldTouched('contactNumber')}
                    />

                    {loading ? <ActivityIndicator size='large' color='#0000ff' /> :
                      <>
                        <View style={styles.containerButtons}>
                          <CustomButton
                            handleOnPress={handleSubmit}
                            title={'Edit'}
                          />
                        </View>
                      </>
                    }

                  </>
                )}

              </Formik>

            </View>



          </View>

          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <AntDesign name='logout' color={'red'} size={40} />
          </TouchableOpacity>


        </View>


      </View>

    </SafeAreaView>
  )
}

export default Profile