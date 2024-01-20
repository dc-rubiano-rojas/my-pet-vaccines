import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: COLORS.primary
    },
    headerContainer: {
        backgroundColor: COLORS.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        flexBasis: '15%',
        borderBottomLeftRadius: 150,
        borderBottomRightRadius: 150,
    },
    formContainer: {
        flexBasis: '100%',
        backgroundColor: COLORS.primary, 
    },
    headerText: {
        color: COLORS.primary,
        fontSize: SIZES.xLarge
    },
    logoButton: {
        width: '100%',
        height: '100%',
        marginVertical: 5,
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default styles;