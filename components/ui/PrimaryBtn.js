import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/colors";

const PrimaryBtn = ({ children, onPressHandler }) => {
  return (
    <View style={styles.btnOuterContainer}>
      <Pressable
        onPress={onPressHandler}
        style={({ pressed }) =>
          pressed
            ? [styles.Pressed, styles.btnInnerContainer]
            : styles.btnInnerContainer
        }
        android_ripple={{ color: Colors.primary600 }}
      >
        <Text style={styles.btnText}>{children}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  btnOuterContainer: {
    margin: 4,
    overflow: "hidden",
  },
  btnInnerContainer: {
    backgroundColor: Colors.primary500,
    borderRadius: 28,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  btnText: {
    color: "white",
    textAlign: "center",
  },
  Pressed: {
    opacity: 0.75,
  },
});

export default PrimaryBtn;
