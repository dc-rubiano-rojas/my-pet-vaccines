import { View, Text, SafeAreaView, TextInput, ActivityIndicator, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import Entypo from 'react-native-vector-icons/Entypo';

import { Formik } from 'formik';
import * as Yup from 'yup';

import * as ImagePicker from 'expo-image-picker'


import styles from './pet-register.style'
import { COLORS, images } from '../../constants'
import { ScreenHeader } from '../../components'
import CustomButton from '../../components/common/buttons/CustomButton';
import { FormDataToRegisterAPet, Pet } from '../../utils/types';
import useUserStore from '../../services/state/zustand/user-store';
import { addPetService } from '../../services/api/pet-service';
import usePetStore from '../../services/state/zustand/pet-store';

import { FIREBASE_STORAGE } from '../../../firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

const PetRegister = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [image, setImage] = useState('')
  const { uid } = useUserStore()
  const { addPet } = usePetStore()

  const setUpload = async () => {
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    })
    if (!result.canceled) {
      console.log('====================================');
      console.log('IMAGE');
      console.log(result.assets);
      console.log('====================================');
      setImage(result.assets[0].uri)
    }
  }
  const uploadImage = async (fileType = 'image') => {
    try {
      const response = await fetch(image)
      const blob = await response.blob()

      const storageRef = ref(FIREBASE_STORAGE, 'Stuff/' + new Date().getTime())
      const uploadTask = uploadBytesResumable(storageRef, blob)
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes)
          console.log('====================================');
          console.log('progress');
          console.log(progress);
          console.log('====================================');
        },
        (error) => {
          // Handle error
        },
        () => {
          // Finally
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log('====================================');
            console.log('downloadUrl');
            console.log(downloadURL);
            console.log('====================================');
            //setImage(downloadUrl)
          })
        }
      )

    } catch (error: any) {
      console.log('====================================');
      console.log('uploadImage - ', error.message);
      console.log('====================================');
    }
  }

  const handleButton = async (data: FormDataToRegisterAPet | any, { resetForm }: any) => {
    try {
      setLoading(true)

      // FIXME: ADD IMAGE
      await uploadImage()

      data.image = image
      await addPetService(data, uid)

      // FIXME: ADD PET TO STATE
/*       addPet(...data as Pet, uid) 
 */    } catch (error: any) {
      alert('register in failed: ' + error.message)
      // FIXME: ADD TOAST - DELETE ALERT
    } finally {
      setLoading(false)
      navigation.navigate('Home')
    }
  }

  const ResgisterPetSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Name is required'),
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>

      <View style={styles.container}>

        <ScreenHeader title={'Pet Register'} />


        <TouchableOpacity
          style={styles.loginText}
          onPress={() => setUpload()}
        >
          {image ? <Image source={{ uri: image }} style={{
            width: 100,
            height: 100,
            resizeMode: 'contain',
            borderRadius: 10
          }}/> : <Entypo name='upload-to-cloud' color={COLORS.primary} size={80} />}


        </TouchableOpacity>

        <View style={styles.formProfileContainer}>
          <View style={styles.inputsContainer}>
            <Formik
              initialValues={{
                name: '',
                age: '',
                gender: '',
                weight: '',
                breed: '',
                color: '',
              }}
              validationSchema={ResgisterPetSchema}
              onSubmit={handleButton}
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

                  <TextInput placeholder='Age' style={styles.input} value={values.age}
                    onChangeText={handleChange('age')}
                    onBlur={() => setFieldTouched('age')} />

                  <TextInput placeholder='Gender' style={styles.input} value={values.gender}
                    onChangeText={handleChange('gender')}
                    onBlur={() => setFieldTouched('gender')} />

                  <TextInput placeholder='Weight' style={styles.input} value={values.weight}
                    onChangeText={handleChange('weight')}
                    onBlur={() => setFieldTouched('weight')}
                  />

                  <TextInput placeholder='Breed' style={styles.input} value={values.breed}
                    onChangeText={handleChange('breed')}
                    onBlur={() => setFieldTouched('breed')}
                  />

                  <TextInput placeholder='Color' style={styles.input} value={values.color}
                    onChangeText={handleChange('color')}
                    onBlur={() => setFieldTouched('color')} />

                  {loading ? <ActivityIndicator size='large' color='#0000ff' /> :
                    <>
                      <CustomButton
                        handleOnPress={handleSubmit}
                        title={'Create'}
                      />
                    </>
                  }
                </>
              )}
            </Formik>
          </View>
        </View>



      </View>
    </SafeAreaView>
  )
}

export default PetRegister