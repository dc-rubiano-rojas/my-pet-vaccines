import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../constants";

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 70,
        marginVertical: 25,
        backgroundColor: COLORS.gray2,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 55,
        borderBottomLeftRadius: 55,
    },
    loginText: {},
    input: {
        marginVertical: 5,
        height: 30,
        borderWidth: 0.2,
        borderRadius: 4,
        padding: 8,
        backgroundColor: COLORS.primary,
    },
    datePicker: {
        borderRadius: 10,
        elevation: 4,
        margin: 40
    },
    containerShowAll: {

    }
});

export default styles;
