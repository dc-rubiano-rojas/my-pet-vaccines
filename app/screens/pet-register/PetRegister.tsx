import { View, Text, SafeAreaView, TextInput, ActivityIndicator, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Entypo from 'react-native-vector-icons/Entypo';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as ImagePicker from 'expo-image-picker'

import styles from './pet-register.style'
import { COLORS, images } from '../../constants'
import { ScreenHeader } from '../../components'
import CustomButton from '../../components/common/buttons/CustomButton';
import { FormDataToRegisterAPet, Pet, ToastType, UserToUpdate } from '../../utils/types';
import useUserStore from '../../services/state/zustand/user-store';
import { addPetService } from '../../services/api/pet-service';
import usePetStore from '../../services/state/zustand/pet-store';

import { FIREBASE_STORAGE } from '../../../firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import showToast from '../../utils/common-toasts';
import { updateUserService } from '../../services/api/user-service';
import { useRoute } from '@react-navigation/native';

const PetRegister = ({ navigation, route }: any) => {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [initialValues, setInitialValues] = useState({
    name: '',
    age: '',
    gender: '',
    weight: '',
    breed: '',
    color: '',
  })
  const [image, setImage] = useState('')
  const {
    name,
    email,
    contactNumber,
    lastname,
    uid,
    petsId,
    updateUser: updateUserStore
  } = useUserStore()
  const {
    addPet: addPetStore,
    name: petName,
    age,
    gender,
    weight,
    breed,
    color,
    image: petImage
  } = usePetStore()

  useEffect(() => {
    console.log('====================================');
    //const route = useRoute();
    console.log('Pet Register component');
    console.log({
      name: petName,
      age,
      gender,
      weight,
      breed,
      color,
      image: petImage
    });
    console.log('====================================');

    /*     setInitialValues({
          name: petName ? petName : '',
          age: age ? age : '',
          gender: '',
          weight: '',
          breed: '',
          color: '',
        }) */
  }, [])


  const handleUploadImage = async () => {
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

  const uploadImage = async (fileType = 'image', data: FormDataToRegisterAPet | any) => {
    try {
      const response = await fetch(image)
      const blob = await response.blob()

      const storageRef = ref(FIREBASE_STORAGE, 'Pets/' + new Date().getTime())
      const uploadTask = uploadBytesResumable(storageRef, blob)
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes)
          console.log('====================================');
          console.log('progress');
          console.log(progress);
          console.log('====================================');
          if (progress === 1) {
            setLoading(false)
            showToast(ToastType.success, 'Pet has been created', 'Succesfully!')
            return
          }
        },
        (error) => {
          // Handle error
        },
        () => {
          // Finally
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            setImage(downloadURL)
            petRegister(data)
          })
        }
      )

    } catch (error: any) {
      console.log('====================================');
      console.log('uploadImage - ', error.message);
      console.log('====================================');
    }
  }

  const petRegister = async (data: FormDataToRegisterAPet | any) => {
    data.image = image
    const petId = await addPetService(data, uid)
    //await updateUser()
    data.pid = petId

    // TODO: Update user
    updateUserService({
      name,
      email,
      contactNumber,
      lastname,
      uid,
      petsId: [...petsId, data.pid],
    })

    // FIXME: ADD PET TO STATE
    addPetStore(data as Pet)
    //pid.push(petId)
    updateUserStore({
      uid,
      name,
      lastname,
      email,
      contactNumber,
      petsId: [...petsId, data.pid],
    })
  }

  const handleSubmitButton = async (data: FormDataToRegisterAPet | any, { resetForm }: any) => {
    if (route.name === 'Pet Register') {
      console.log('====================================');
      console.log('PRESS PET REGISTER');
      console.log('===================================');

      try {
        setLoading(true)

        await uploadImage('image', data)

      } catch (error: any) {
        setLoading(false)
        showToast(ToastType.error, 'There is an error', 'Contact client service!')
      } finally {
        resetForm()
        //setImage('')
      }
      return
    }

    if (route.name === 'Pet Edit') {
      console.log('====================================');
      console.log('PRESS PET EDIT');
      console.log('====================================');
      try {

      } catch (error) {
        setLoading(false)
        showToast(ToastType.error, 'There is an error', 'Contact client service!')
      }
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

        <ScreenHeader title={route.name || 'Pet Register'} />

        <TouchableOpacity
          style={styles.loginText}
          onPress={() => handleUploadImage()}
        >
          {image ? <Image source={{ uri: image }} style={{
            width: 100,
            height: 100,
            resizeMode: 'contain',
            borderRadius: 10
          }} /> : <Entypo name='upload-to-cloud' color={COLORS.primary} size={80} />}
        </TouchableOpacity>

        <View style={styles.formProfileContainer}>
          <View style={styles.inputsContainer}>
            <Formik
              initialValues={{
                name: petName ? petName : '',
                age: age ? age : '',
                gender: gender ? gender : '',
                weight: weight ? weight : '',
                breed: breed ? breed : '',
                color: color ? color : '',
              }}
              validationSchema={ResgisterPetSchema}
              onSubmit={handleSubmitButton}
            >
              {({
                values,
                errors,
                touched,
                handleSubmit,
                handleChange,
                setFieldTouched,
                isValid,
                resetForm
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
                        title={route.name === 'Pet Register' ? 'Create' : 'Edit'}
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