import { Alert, StyleSheet, Text, View } from "react-native";
import Title from "../components/ui/Title";
import { useEffect, useState } from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryBtn from "../components/ui/PrimaryBtn";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import { Ionicons } from "@expo/vector-icons";

function generateRandomNumberBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomNumberBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minVal = 1;
let maxVal = 100;

const GameScreen = ({ userNumber, onGameOver }) => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomNumberBetween(1, 100, userNumber)
  );

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver();
    }
  }, [currentGuess, userNumber, onGameOver]);

  function nextGuessHandler(direction) {
    // direction => 'lower' or 'greater'
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", "You know that is wrong...", [
        {
          text: "Hehe",
          style: "cancel",
        },
      ]);
      return;
    }
    if (direction === "lower") {
      maxVal = currentGuess;
    } else {
      minVal = currentGuess + 1;
    }
    const newRndNum = generateRandomNumberBetween(minVal, maxVal, currentGuess);
    setCurrentGuess(newRndNum);
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or lower?
        </InstructionText>
        <View style={styles.btnsContainer}>
          <View style={styles.btnContainer}>
            <PrimaryBtn onPressHandler={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="remove-outline" size={24} color="white" />
            </PrimaryBtn>
          </View>
          <View style={styles.btnContainer}>
            <PrimaryBtn onPressHandler={nextGuessHandler.bind(this, "greater")}>
              <Ionicons name="add-outline" size={24} color="white" />
            </PrimaryBtn>
          </View>
        </View>
      </Card>
      <View>
        <Text>LOG rounds</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 12,
    marginTop: 50,
  },
  instructionText: {
    marginBottom: 12,
  },
  btnsContainer: {
    flexDirection: "row",
  },
  btnContainer: {
    flex: 1,
  },
});

export default GameScreen;
