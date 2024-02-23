import React, { useEffect, useState } from 'react'
import { ActivityIndicator, SafeAreaView, RefreshControl, ScrollView, FlatList } from 'react-native';
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
import PetCard from '../../components/my-pet/PetCard';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}
const handleButton = async () => {


}

const Home = ({ navigation }: RouterProps) => {
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [showAddRegister, setShowAddRegister] = useState(false)

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
        pets,
        addPet: addPetStore,
        reducePets: reducePetsStore
    } = usePetStore()

    useEffect(() => {
        console.log('====================================');
        console.log('pets');
        console.log(pets);
        console.log('====================================');
    }, [])

    const onRefresh = async () => {
        console.log('====================================');
        console.log('onRefresh');
        console.log('====================================');
        setRefreshing(true);
        reducePetsStore()
        for await (const petId of petsId) {
            const pet: any = await getPetService(petId) || []
            addPetStore({
                name: pet.data().name || '',
                age: pet.data().age || '',
                gender: pet.data().gender || '',
                weight: pet.data().weight || '',
                breed: pet.data().breed || '',
                color: pet.data().color || '',
                uid: pet.data().uid || '',
                image: pet.data().image || ''
            })
        }

        setRefreshing(false);

    }

    const renderPager = () => {
        console.log('====================================');
        console.log('pets');
        console.log(pets);
        console.log('pets.length > 0');
        console.log(pets.length > 0);
        console.log('====================================');
        return (
            <PagerView style={styles.pagerView} initialPage={0}>
                {
                    pets.map((pet, index) => (
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
                    ))
                }
            </PagerView>
        )
    }

    const navigatePetEdit = () => navigation.navigate('PetEdit')

    const renderFlatList = () => {
        return (
            <FlatList
                data={pets}
                renderItem={({ item, index }: any) => <PetCard 
                    pet={item}
                    index={index}
                    loading={!pets ? true : false}
                    navigatePetEdit={navigatePetEdit} />}
                horizontal={true}
                showsHorizontalScrollIndicator={true}
                alwaysBounceHorizontal={false}
                pagingEnabled={true}
                style={styles.flatListContainer}
            />
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>

            <View style={styles.container}>

                <ScreenHeader title={'Home'} />

                <ScrollView refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>

                    {loading ? <ActivityIndicator size='large' color='#0000ff' /> :
                        <>
                            {showAddRegister && (
                                <TouchableOpacity style={styles.viewWithoutPets} onPress={() => navigation.navigate('Pet Register')}>
                                    <Ionicons name='add-circle-outline' color={COLORS.primary} size={40} style={styles.textViewWithoutPets} />
                                </TouchableOpacity>
                            )}

                            <View style={styles.flatListContainer}>

                                {pets.length > 0 && renderFlatList()}
                            </View>
                        </>
                    }
                </ScrollView>



            </View >
        </SafeAreaView>
    )
}

export default Home