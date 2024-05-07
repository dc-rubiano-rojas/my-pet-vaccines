import { View, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native'
import React from 'react'
import styles from './VaccineCard.styles'

const VaccineCard = ({ item }: any) => {
    return (
        <SafeAreaView style={styles.vaccineCardContainer}>
            <TouchableOpacity
                style={styles.imageContainer}>
                <Image source={{ uri: item.img }}
                    resizeMode='cover'
                    style={{
                        height: '100%',
                        width: '100%',
                        borderBottomLeftRadius: 10,
                        borderTopRightRadius: 10,
                    }}
                />
            </TouchableOpacity>


            <View style={styles.infoContainer}>
                <Text numberOfLines={1}>
                </Text>

                <Text>
                    {item.job_country}
                </Text>
            </View>

        </SafeAreaView>
    )
}

export default VaccineCard