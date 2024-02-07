import { View, Text, SafeAreaView, TextInput, ActivityIndicator, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Formik } from 'formik';
import * as Yup from 'yup';

import styles from './pet-register.style'
import { COLORS, images } from '../../constants'
import { ScreenHeader } from '../../components'
import CustomButton from '../../components/common/buttons/CustomButton';
import { FormDataToRegisterAPet, Pet } from '../../utils/types';
import useUserStore from '../../services/state/zustand/user-store';
import { addPetService } from '../../services/api/pet-service';
import usePetStore from '../../services/state/zustand/pet-store';

const PetRegister = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false)
  const { uid } = useUserStore()
  const { addPet } = usePetStore()


  const handleButton = async (data: FormDataToRegisterAPet | any, { resetForm }: any) => {
    try {
      setLoading(true)
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


        <FontAwesome5 name='user-circle' color={COLORS.primary} style={styles.loginText} size={80} />
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