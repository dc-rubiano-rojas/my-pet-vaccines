import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: COLORS.gray,
  },
  addVaccineContainer: {
    flexBasis: '40%',
    backgroundColor: COLORS.gray,
    flex: 1,
    flexDirection: "column",
  },
  allVaccinesContainer: {
    flexBasis: '60%',
    flex: 1,
    flexDirection: "column",
    backgroundColor: COLORS.gray,
    borderTopStartRadius: 75,
  },
  textViewWithoutPets: {},
  viewWithoutPets: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: COLORS.tertiary,
    borderRadius: 50,
    width: 60,
    height: 60,
    paddingLeft: 3,
    marginTop: 15,
    marginBottom: 15,
  },
});

export default styles;
