import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../constants";

const styles = StyleSheet.create({
    vaccineCardContainer: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: COLORS.tertiary,
        marginVertical: 6,
        borderRadius: 8,
    },
    imageContainer: {
        flexBasis: '30%',
        height: 80
    },
    infoContainer: {},
});

export default styles;
