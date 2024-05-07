import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../constants";

const styles = StyleSheet.create({
    addVaccineContainer: {

        flexBasis: '30%',

    },
    container: {
        marginHorizontal: 70,
        marginVertical: 15,
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
        flexBasis: '70%',
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.secondary,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    cardsContainer: {
        marginVertical: 30,
        marginHorizontal: 15,
    },
    flatListContainer: {
    },
    vaccineCardContainer: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: COLORS.lightWhite,
        marginVertical: 6,
        borderRadius: 8,
    },
    infoContainer: {},
    imageContainer: {},
});

export default styles;
