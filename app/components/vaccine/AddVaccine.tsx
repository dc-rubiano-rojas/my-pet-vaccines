import React, { useState } from 'react'
import {
    View,
    Text,
    Button,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    TextInput
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Overlay } from 'react-native-elements';

import styles from './Vaccine.style';
import Entypo from 'react-native-vector-icons/Entypo';
import { COLORS } from '../../constants';
import { CustomDatePicker } from '../date-picker/DatePicker';

function AddVaccine() {
    const [name, setName] = useState(() => '')
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [showPicker, setShowPicker] = useState(false)

    const [showToSelectDate, setShowToSelectDate] = useState(false)

    const handleUploadImage = () => { }
    const handleVaccineDateInfo = (day: any) => {
        console.log('selected day', day);
        console.log('selected day dateString', day.dateString);
        setDate(day.dateString);
        setShowToSelectDate(false)
    }

    const toggleDatePicker = () => {
        setShowPicker(!showPicker)
    }
    const onChange = ({ type }: any, selectedDay: any) => {
        if (type == "set") {
            const currentDate = selectedDay
            setDate(currentDate)
        } else {
            toggleDatePicker()
        }
    }


    return (
        <View style={styles.container}>

            {!!!showToSelectDate &&
                <>
                    <TouchableOpacity
                        style={styles.loginText}
                        onPress={() => handleUploadImage()}
                    >
                        <Entypo name='upload-to-cloud' color={COLORS.primary} size={40} />

                    </TouchableOpacity>
                    <TextInput style={styles.input} placeholder='Name' autoCapitalize='none' onChangeText={(text) => setName(text)} />
                </>
            }


            <TouchableOpacity style={styles.input} onPress={() => setShowPicker(!showPicker)}>
                <Text>Date</Text>
            </TouchableOpacity>
            {showPicker && (
                <DateTimePicker
                    mode="date"
                    display='spinner'
                    value={date}
                    onChange={onChange}
                    style={styles.datePicker}
                />
            )}
            {/*                 <CustomDatePicker/>
 */}


        </View>
    )
}

export default AddVaccine