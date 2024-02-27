import { View, Text, Button, SafeAreaView } from 'react-native'

import React from 'react'
import { ScreenHeader } from '../../../components'
import styles from './show-vaccine-modal'

const ShowVaccineModal = ({ navigation }: any) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <ScreenHeader title={'Vaccines'} />

                <Button onPress={() => navigation.goBack()} title="Dismiss" />
            </View>
        </SafeAreaView>

    )
}

export default ShowVaccineModal