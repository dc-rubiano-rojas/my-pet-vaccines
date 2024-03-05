import { View, Text, Button, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';

import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { ScreenHeader } from '../../../components'
import styles from './show-vaccine-modal'
import { COLORS } from '../../../constants'
import AddVaccine from '../../../components/vaccine/AddVaccine';
import ShowAll from '../../../components/vaccine/ShowAll';

const ShowVaccineModal = ({ navigation }: any) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <ScreenHeader title={'Vaccines'} />

                <View style={styles.container}>
                    <View style={styles.addVaccineContainer}>
                        <AddVaccine />
                    </View>
                    <ScrollView style={styles.allVaccinesContainer}>
                        <ShowAll />
                    </ScrollView>
                </View>

                <TouchableOpacity style={styles.viewWithoutPets} onPress={() => navigation.goBack()}>
                    <Ionicons name='close' color={COLORS.primary} size={40} style={styles.textViewWithoutPets} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    )
}

export default ShowVaccineModal