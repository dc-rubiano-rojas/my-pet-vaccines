import React, { useEffect } from 'react';
import {
    Platform,
    Text,
    StyleSheet,
    TextInput,
    View,
    TouchableOpacity
} from 'react-native';
import { Overlay } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import styles from './DatePicker.styles';


export class CustomDatePicker extends React.Component<any, any> {
    state = {
        dateString: moment(new Date()).format('YYYY-MM-DD'),
        date: this.props.date || new Date(),
        show: false
    };
    onChange = (event: any, selectedDate: any) => {
        console.log(selectedDate)
        this.setState({ dateString: moment(selectedDate).format('YYYY-MM-DD'), date: selectedDate })
    }
    showOverlay = () => {
        this.setState({ show: true })
    }
    hideOverlay = () => {
        this.setState({ show: false })
    }



    render() {
        return (
            <View style={{ flex: 1, borderRadius: 100 }}>
                <TouchableOpacity onPress={this.showOverlay} style={styles.inputContainerStyle}>
                    {this.state.dateString ? (
                        <Text style={styles.textStyle}>{this.state.dateString}</Text>
                    ) : (
                        <Text style={styles.placeholderStyle}>{this.props.placeholder}</Text>
                    )}
                </TouchableOpacity>
                {Platform.OS === 'ios' ? (
                    <Overlay isVisible={this.state.show} onBackdropPress={this.hideOverlay} overlayStyle={styles.overlayStyle}>
                        <View style={styles.headerStyle}>
                            <TouchableOpacity onPress={this.hideOverlay}>
                                <Text style={{ paddingHorizontal: 15 }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.hideOverlay}>
                                <Text style={{ paddingHorizontal: 15, color: 'green' }}>Done</Text>
                            </TouchableOpacity>
                        </View>
                        <DateTimePicker
                            value={this.state.date}
                            mode={'date'}
                            is24Hour={true}
                            display="default"
                            onChange={this.onChange}
                            style={{ backgroundColor: 'white' }}
                        />
                    </Overlay>
                ) : (
                    <>
                        {this.state.show &&
                            <DateTimePicker
                                value={this.state.date}
                                mode={'date'}
                                is24Hour={true}
                                display="default"
                                onChange={this.onChange}
                                style={{ backgroundColor: 'white' }}
                            />
                        }
                    </>
                )}
            </View>
        );
    }
};