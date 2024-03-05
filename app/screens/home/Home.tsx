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
import { onSnapshot } from 'firebase/firestore';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const Home = ({ navigation }: RouterProps) => {
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [showAddRegister, setShowAddRegister] = useState(false)

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
        reducePets: reducePetsStore,
        deletePetToEdit
    } = usePetStore()

    useEffect(() => {
        console.log('====================================');
        console.log('HOME useEffect pets');
        console.log(pets);
        console.log('====================================');
        if(pets.length <= 0) setShowAddRegister(true)
        if(pets.length > 0) setShowAddRegister(false)

        //const unsuscribe = onSnapshot(collection())

    }, [pets])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          // opened
          console.log('====================================');
          console.log('CLOSE MODAL');
          console.log('====================================');
          deletePetToEdit()
        });
        return () => {
          // closed
          unsubscribe()
        };
      }, [navigation]);

    const onRefresh = async () => {
        console.log('====================================');
        console.log('onRefresh');
        console.log('====================================');
        setRefreshing(true);
        reducePetsStore()
        for await (const petId of petsId) {
            const pet: any = await getPetService(petId) || []
            console.log('====================================');
            console.log('pet');
            console.log( petId);
            console.log('====================================');
            addPetStore({
                pid: petId.toString(),
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
                horizontal={false}
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