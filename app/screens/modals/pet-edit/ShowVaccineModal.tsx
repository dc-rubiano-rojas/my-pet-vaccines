import { View, Text, Button, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';

import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { ScreenHeader } from '../../../components'
import styles from './show-vaccine-modal'
import { COLORS } from '../../../constants'
import AddVaccine from '../../../components/vaccine/AddVaccine';
import ShowAll from '../../../components/vaccine/ShowAll';

const ShowVaccineModal = ({ navigation }: any) => {
    console.log('====================================');
    console.log('SHOW VACCINE MODAL');
    console.log('====================================');
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <ScreenHeader title={'Vaccines'} />

                <View style={styles.container}>
                    <AddVaccine />
                    <ShowAll />
                </View>
            </View>
        </SafeAreaView>

    )
}

export default ShowVaccineModal