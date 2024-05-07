import { View, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native'
import React from 'react'
import styles from './Vaccine.style'

const VaccineCard = ({ item }: any) => {
    return (
        <SafeAreaView style={styles.vaccineCardContainer}>
            <TouchableOpacity
                style={styles.imageContainer}>
                {/*                 <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/my-pet-vaccines.appspot.com/o/Pets%2F1709211245457?alt=media&token=fcce99e9-d955-4c45-ad8a-660a0aebe57f' }}
                    resizeMode='cover'
                    style={{
                        height: '100%',
                        width: '100%',
                        borderBottomLeftRadius: 75,
                        borderTopRightRadius: 75,
                    }}
                /> */}
            </TouchableOpacity>


            <View style={styles.infoContainer}>
                <Text numberOfLines={1}>
                    {item.job_title}
                </Text>

                <Text>
                    {item.job_country}
                </Text>
            </View>

        </SafeAreaView>
    )
}

export default VaccineCard