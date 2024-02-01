import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: COLORS.gray2
    },
    headerContainer: {
        backgroundColor: COLORS.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        flexBasis: '15%',
        borderBottomLeftRadius: 75,

    },
    registerContainer: {
        flexBasis: '85%',
        backgroundColor: COLORS.gray2,
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'column',
    },
    headerButton: {
        width: '100%',
        height: '100%',
        marginVertical: 5,
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        color: COLORS.primary,
        fontSize: SIZES.xLarge,
    },
    dogContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 10,
        flexBasis: '14%',

    },
    logoutButton: {
        alignItems: 'center',
        paddingTop: 34,
        flexBasis: '24%',
    },
    formProfileContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "flex-start",
        backgroundColor: COLORS.gray,
        borderTopRightRadius: 75,
        borderBottomLeftRadius: 75
    },
    inputsContainer: {
        marginTop: 5,
        marginHorizontal: 20
    },
    loginText: {
        color: COLORS.primary,
        marginTop: 10,
        marginBottom: 10,
        alignSelf: 'center',
    },
    input: {
        marginVertical: 4,
        height: 40,
        borderWidth: 0.2,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff'
    },
});

export default styles;