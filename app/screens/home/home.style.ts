import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";
import { Colors } from "react-native-ui-lib";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 10,
    
  },
  addPetButton: {
    alignItems: "center",
    width: 55,
    height: 55,
    borderRadius: 70,
    marginTop: 10,
    padding: 10,
    backgroundColor: COLORS.primary,
  },
  imageContainer: {
    alignItems: "center",
    width: 55,
    height: 55,
    backgroundColor: COLORS.primary,
  },
  footprint: {
    width: 15,
    height: 15,
    paddingTop: 7,
  },
  buttonText: {
    paddingTop: 7,
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.secondary,
  },
});

export default styles;
