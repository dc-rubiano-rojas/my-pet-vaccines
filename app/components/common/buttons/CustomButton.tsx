import { View, Text } from 'react-native'
import React from 'react'
import styles from './login-button.style'
import { TouchableOpacity } from 'react-native-ui-lib'

const CustomButton = ({handleOnPress, title}: any) => {
    return (

        <TouchableOpacity
            style={styles.buttonsLogin}
            onPress={() => handleOnPress()}
        >
            <Text style={styles.buttonsLoginText}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton