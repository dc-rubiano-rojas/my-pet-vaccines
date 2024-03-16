import React, { useState } from 'react'
import {
    View,
    Text,
    Button,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Modal
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Calendar from 'react-native-calendars/src/calendar';
import { Overlay } from 'react-native-elements';

import styles from './Vaccine.style';
import Entypo from 'react-native-vector-icons/Entypo';
import { COLORS } from '../../constants';
import { CustomDatePicker } from '../date-picker/DatePicker';
import CustomButton from '../common/buttons/CustomButton';

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
    const handleSubmit = () => {
        console.log('====================================');
        console.log('SUBMIT');
        console.log('====================================');
    }
    const onChangeCalendar = (date: any) => {
        console.log('====================================');
        console.log('date');
        console.log(date);
        console.log('====================================');
        setShowPicker(false)
    }


    return (
        <View style={styles.container}>

            <Modal visible={showPicker} animationType='fade'>
                <Calendar
                    onDayPress={date => onChangeCalendar(date)}
                    style={{
                        borderWidth: 40,
                        borderColor: COLORS.secondary,
                        borderRadius: 10,
                        elevation: 4,
                        margin: 50,
                    }}
                    hideExtraDays={true}
                />
            </Modal>

            <>
                <TouchableOpacity
                    style={styles.loginText}
                    onPress={() => handleUploadImage()}
                >
                    <Entypo name='upload-to-cloud' color={COLORS.primary} size={40} />

                </TouchableOpacity>
                <TextInput style={styles.input} placeholder='Name' autoCapitalize='none' onChangeText={(text) => setName(text)} />
            </>


            <TouchableOpacity style={styles.input} onPress={() => setShowPicker(!showPicker)}>
                <Text>Date</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.input} onPress={handleSubmit}>
                <Text>Submit</Text>
            </TouchableOpacity>

        </View>
    )
}

export default AddVaccine