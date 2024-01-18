import { View, Text } from 'react-native'
import React from 'react'
import styles from './login-button.style'
import { TouchableOpacity } from 'react-native-ui-lib'

const LoginButton = ({handleOnPress, title}: any) => {
    return (

        <TouchableOpacity
            style={styles.buttonsLogin}
            onPress={() => handleOnPress()}
        >
            <Text style={styles.buttonsLoginText}>{title}</Text>
        </TouchableOpacity>
    )
}

export default LoginButton