import React from 'react'
import { SafeAreaView } from 'react-native';
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

interface RouterProps {
    navigation: NavigationProp<any, any>;
}
const handleButton = async () => {


}

const Home = ({ navigation }: RouterProps) => {
    const onPress = () => navigation.navigate('Pet Register')

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
            <View style={styles.container}>

                <ScreenHeader title={'Home'} />

                <TouchableOpacity style={styles.viewWithoutPets} onPress={() => navigation.navigate('Pet Register')}>
                    <Ionicons name='add-circle-outline' color={COLORS.primary} size={40} style={styles.textViewWithoutPets} />
                </TouchableOpacity>


                <PagerView style={styles.pagerView} initialPage={0}>
                    <View key="1" style={styles.page} >
                        <View style={styles.pageTitle}>
                            <FontAwesome6 name='bone' color={COLORS.primary} size={40} />
                            <Text style={styles.textTitle}>Limón</Text>
                            <FontAwesome6 name='bone' color={COLORS.primary} size={40} />
                        </View>
                        <TouchableOpacity style={styles.imageContainer} onPress={() => navigation.navigate('PetEdit')}>
                            <Image source={images.limon} style={styles.image}
                                resizeMode='cover'
                            />
                        </TouchableOpacity>
                        <View style={styles.petInfoContainer}>
                            <View style={styles.dogInfoContainer}>
                                <Text style={styles.dogInfoText}><Text style={styles.dogInfoTextBold}>Age: </Text>9 Years</Text>
                                <Text style={styles.dogInfoText}><Text style={styles.dogInfoTextBold}>Weight: </Text>20Kg</Text>
                                <Text style={styles.dogInfoText}><Text style={styles.dogInfoTextBold}>Color: </Text>Gris</Text>
                                <Text style={styles.dogInfoText}><Text style={styles.dogInfoTextBold}>Gender: </Text>M</Text>
                                <Text style={styles.dogInfoText}><Text style={styles.dogInfoTextBold}>Breed: </Text>Criollo</Text>
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

                    <View key="2">
                        <Text>Second page</Text>
                    </View>
                </PagerView>

            </View >
        </SafeAreaView>


    )
}

export default Home