import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
    loginContainer: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: COLORS.primary
    },
    loginText: {
        paddingTop: 7,
        fontSize: SIZES.medium,
        color: COLORS.secondary,
    },
    input: {
        marginVertical: 4,
        height: 40,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff'
    }
});

export default styles;