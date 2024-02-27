import { View, Text, Colors, TouchableOpacity, Image } from 'react-native-ui-lib';
import { ActivityIndicator } from 'react-native';

import React, { useEffect, useState } from 'react'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CustomButton from '../common/buttons/CustomButton'
import styles from './MyPet.style'
import { COLORS, images } from '../../constants'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import usePetStore from '../../services/state/zustand/pet-store';
interface RouterProps {
    navigation: NavigationProp<any, any>;
    pet: any,
    index: any,
    loading: any
}

const PetCard = ({ pet, index, loading }: any) => {
    const navigation = useNavigation();
    const {
        addPet: addPetStore,
        updateIsAvaliableToEdit,
        updatePetIdToEdit
    } = usePetStore()


    const handleButton = async () => {
        console.log('====================================');
        console.log('click navigate');
        console.log('====================================');
        //updatePetIdToEdit(pet.pid)
        navigation.setOptions({ pet } as any)
        navigation.setParams({ pet } as any)
        navigation.navigate('Pet Edit' as never)
    }
    /*     console.log('====================================');
        console.log('PetCard');
        console.log(pet);
        console.log('===================================='); */

    useEffect(() => {
        console.log('====================================');
        console.log('PET CARD USEEFFECT');
        console.log('====================================');
        
    }, [])

    return (
        <View>
            <>

                <View key={index} style={styles.page} >
                    <View style={styles.pageTitle}>
                        <FontAwesome6 name='bone' color={COLORS.primary} size={40} />
                        <Text style={styles.textTitle}>{pet.name}</Text>
                        <FontAwesome6 name='bone' color={COLORS.primary} size={40} />
                    </View>
                    <TouchableOpacity
                        style={styles.imageContainer}
                        onPress={() => navigation.navigate('Vaccines' as never)}>
                        <Image source={images.limon}
                            resizeMode='cover'
                            style={{
                                height: '100%',
                                width: '100%',
                                borderBottomLeftRadius: 75,
                                borderTopRightRadius: 75,
                            }}
                        />
                    </TouchableOpacity>
                    <View style={styles.petInfoContainer}>
                        <View style={styles.dogInfoContainer}>
                            <Text style={styles.dogInfoText}><Text style={styles.dogInfoTextBold}>Age: </Text>{pet.age} Years</Text>
                            <Text style={styles.dogInfoText}><Text style={styles.dogInfoTextBold}>Weight: </Text>{pet.weight} Kg</Text>
                            <Text style={styles.dogInfoText}><Text style={styles.dogInfoTextBold}>Color: </Text>{pet.color}</Text>
                            <Text style={styles.dogInfoText}><Text style={styles.dogInfoTextBold}>Gender: </Text>{pet.gender}</Text>
                            <Text style={styles.dogInfoText}><Text style={styles.dogInfoTextBold}>Breed: </Text>{pet.breed}</Text>
                            <Text style={styles.dogInfoText}><Text style={styles.dogInfoTextBold}>Height: </Text>20cm</Text>
                        </View>

                        <CustomButton
                            handleOnPress={() => handleButton()}
                            title={'Edit'}
                        />
                        <CustomButton
                            handleOnPress={() => navigation.navigate('Vaccines' as never)}
                            title={'Vaccines'}
                        />
                    </View>
                </View>

            </>


        </View>
    )
}

export default PetCard