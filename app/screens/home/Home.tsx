import React, { useEffect, useState } from 'react'
import { ActivityIndicator, SafeAreaView } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { View, Text, Colors, TouchableOpacity, Image } from 'react-native-ui-lib';
import PagerView from 'react-native-pager-view';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { FIREBASE_AUTH } from '../../../firebaseConfig';
import styles from './home.style';
import { COLORS, images } from '../../constants';
import { ScreenHeader, ScreenHeaderBtn } from '../../components';
import CustomButton from '../../components/common/buttons/CustomButton';
import { getPetService } from '../../services/api/pet-service';
import useUserStore from '../../services/state/zustand/user-store';
import usePetStore from '../../services/state/zustand/pet-store';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}
const handleButton = async () => {


}

const Home = ({ navigation }: RouterProps) => {
    const [loading, setLoading] = useState(false)
    const onPress = () => navigation.navigate('Pet Register')

    const {
        name,
        email,
        contactNumber,
        lastname,
        uid,
        deleteUser,
        petsId } = useUserStore()

    const {
        pets
    } = usePetStore()

    useEffect(() => {
        const fetchPetData = async () => {


            for (const petId of petsId) {
                const pet: any = await getPetService(petId) || []
                console.log('====================================');
                console.log('pets');
                console.log(pet.data());
                console.log('====================================');
                pets.push({
                    name: pet.data().name,
                    age: pet.data().age,
                    gender: pet.data().gender,
                    weight: pet.data().weight,
                    breed: pet.data().breed,
                    color: pet.data().color,
                    uid: pet.data().uid,
                    image: pet.data().image
                })
                setLoading(false)

                // TODO: GUARDAR PETS EN PET STORE
                /*                 console.log('====================================');
                                console.log('USE EFFECT DATA');
                                console.log(pets);
                                console.log('===================================='); */
                //setPets(pets)
            }

        };
        setLoading(true)
        fetchPetData();
    }, [])

    const renderPager = () => {
        return (
            <PagerView style={styles.pagerView} initialPage={0}>
                {
                    pets.map((pet, index) =>
                        <View key={index} style={styles.page} >
                            <View style={styles.pageTitle}>
                                <FontAwesome6 name='bone' color={COLORS.primary} size={40} />
                                <Text style={styles.textTitle}>{pet.name}</Text>
                                <FontAwesome6 name='bone' color={COLORS.primary} size={40} />
                            </View>
                            <TouchableOpacity style={styles.imageContainer} onPress={() => navigation.navigate('PetEdit')}>
                                <Image source={images.limon} style={styles.image}
                                    resizeMode='cover'
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
                                    handleOnPress={handleButton}
                                    title={'Edit'}
                                />
                                <CustomButton
                                    handleOnPress={() => navigation.navigate('PetEdit')}
                                    title={'Vaccines'}
                                />
                            </View>
                        </View>
                    )
                }
            </PagerView>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
            <View style={styles.container}>

                <ScreenHeader title={'Home'} />

                {loading ? <ActivityIndicator size='large' color='#0000ff' /> :
                    <>
                        <TouchableOpacity style={styles.viewWithoutPets} onPress={() => navigation.navigate('Pet Register')}>
                            <Ionicons name='add-circle-outline' color={COLORS.primary} size={40} style={styles.textViewWithoutPets} />
                        </TouchableOpacity>

                        {pets.length > 0 && renderPager()}
                    </>
                }


            </View >
        </SafeAreaView>
    )
}

export default Home