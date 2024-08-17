import { useState } from "react";
import { StyleSheet, TextInput, View, Alert } from "react-native";
import PrimaryBtn from "../components/ui/PrimaryBtn";
import Colors from "../constants/colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

const StartGameScreen = ({ setNumber }) => {
  const [enteredNumber, setEnteredNumber] = useState("");

  function numberInputHandler(enteredText) {
    setEnteredNumber(enteredText);
  }

  function resetInput() {
    setEnteredNumber("");
  }

  function confirmInputHandler() {
    const number = parseInt(enteredNumber);
    if (isNaN(number) || number <= 0 || number > 99) {
      // show alert
      Alert.alert(
        "Invalid number!",
        "Input has to be a number between 1 and 99.",
        [
          {
            text: "Okay",
            style: "destructive",
            onPress: resetInput,
          },
        ]
      );
      return;
    }

    setNumber(number);
  }

  return (
    <View style={styles.rootContainer}>
      <Title>Guess My Number</Title>
      <Card>
        <InstructionText>Enter a number</InstructionText>
        <TextInput
          style={styles.numberInput}
          maxLength={2}
          onChangeText={numberInputHandler}
          keyboardType="number-pad"
          autoCapitalize="none"
          autoCorrect={false}
          value={enteredNumber}
        />
        <View style={styles.btnsContainer}>
          <View style={styles.btnContainer}>
            <PrimaryBtn onPressHandler={resetInput}>Reset</PrimaryBtn>
          </View>
          <View style={styles.btnContainer}>
            <PrimaryBtn onPressHandler={confirmInputHandler}>
              Confirm
            </PrimaryBtn>
          </View>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: "center",
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  btnsContainer: {
    flexDirection: "row",
  },
  btnContainer: {
    flex: 1,
  },
});

export default StartGameScreen;
