import { View, Button, StyleSheet, TextInput, ActivityIndicator, KeyboardAvoidingView, SafeAreaView, Image, Text, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-ui-lib';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';

import styles from './user-profile.style'
import { COLORS, icons, images } from '../../../constants'
import { FIREBASE_AUTH } from '../../../firebaseConfig';
import { Input } from '../login/Register';
import { useForm } from 'react-hook-form';
import LoginButton from '../../../components/common/buttons/LoginButton';
import { ScreenHeader } from '../../../components';

const Profile = () => {
  const { control, handleSubmit } = useForm()
  const handleButton = async () => {


  }

  return (
    <SafeAreaView style={styles.container}>


       <ScreenHeader title={'Profile'} /> 

      <ImageBackground source={images.backgroundPatter} style={styles.registerContainer}>

        <TouchableOpacity style={styles.dogContainer}>
          {/*           <FontAwesome6 name='bone' color={COLORS.tertiary} size={80} />
          <FontAwesome6 name='bone' color={COLORS.tertiary} size={80} /> */}
          {/*           <Text style={styles.loginText}>Hey, Daniel</Text>
 */}
        </TouchableOpacity>

        <View style={styles.formProfileContainer}>
          <View style={styles.inputsContainer}>
            <FontAwesome5 name='user-circle' color={COLORS.primary} style={styles.loginText} size={80} />

            <Input name='Name' control={control} />
            <Input name='Lastname' control={control} />
            <Input name='Email' control={control} />
            <LoginButton
              handleOnPress={handleSubmit(handleButton)}
              title={'Edit'}
            />
          </View>
        </View>

        <TouchableOpacity onPress={async () => await FIREBASE_AUTH.signOut()
        } style={styles.logoutButton}>
          <AntDesign name='logout' color={'red'} size={55} />
        </TouchableOpacity>


      </ImageBackground>



    </SafeAreaView>
  )
}

export default Profile