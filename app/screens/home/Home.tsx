import React from 'react'
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../../firebaseConfig';
import { View, Text, Colors, TouchableOpacity, Image } from 'react-native-ui-lib';
import styles from './home.style';
import MyPets from '../../../components/my-pets/MyPets';
import { SafeAreaView } from 'react-native';
import { COLORS, images } from '../../../constants';
import { ScreenHeaderBtn } from '../../../components';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const Home = ({ navigation }: RouterProps) => {
    const onPress = () => navigation.navigate('Pet Register')

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
            <View style={styles.container}>

                {/*             <MyPets/>
 */}
                {/*          <TouchableOpacity style={styles.addPetButton} onPress={onPress} >
                    <View style={styles.imageContainer}>
                        <Image style={styles.buttonText} source={require('../../../assets/images/pet-footprint.png')} />
                    </View>
                    <Text style={styles.buttonText}>Add</Text>

                </TouchableOpacity> */}
                <TouchableOpacity style={styles.addPetButton} onPress={onPress} >

                    <ScreenHeaderBtn iconUrl={images.petFootPrint} dimension='100%' handlePress={onPress} />
                </TouchableOpacity>

            </View >
        </SafeAreaView>


    )
}

export default Home