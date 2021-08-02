import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { movies } from "./movies";

export default function App() {
  const [count, setCount] = useState(0);
  const [lives, setLives] = useState(3);
  const pressHandler = (text) => {
    text.toLowerCase() === movies[count].movie
      ? (setCount(count + 1), setText(""))
      : errorHandler();
  };
  const [text, setText] = useState("");
  const getText = (value) => {
    setText(value);
  };

  const errorHandler = () => {
    Alert.alert("Oops!", "Thats not the right answer");
    setLives(lives - 1);
    if (lives === 1) {
      Alert.alert("Oh no!", "You have run out of lives", [{ text: "Restart" }]);
      setCount(0);
      setLives(3);
    }
  };

  if (count === 7) {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <Text style={styles.winText}>You won!</Text>
        <TouchableOpacity style={styles.winButton} onPress={() => setCount(0)}>
          <Text style={styles.buttonText}>Play again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.winContainer}>
      <StatusBar style="light" />
      <Text style={styles.text}>Guess the movie</Text>
      <Text style={styles.emojis}>{movies[count].emojis}</Text>
      <View style={styles.intputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name..."
          onChangeText={(value) => getText(value)}
          value={text}
        />
        <TouchableOpacity style={styles.button} onPress={() => pressHandler(text)}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.extra}>
        <Text style={styles.scoreText}>Score: {count}</Text>
        <Text style={styles.scoreText}>Lives: {lives}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    paddingVertical: 64,
    paddingHorizontal: 32,
  },
  text: {
    color: "#FEA248",
    fontSize: 24,
    fontWeight: "bold",
  },
  emojis: {
    fontSize: 32,
    marginVertical: 32,
  },
  intputContainer: {
    flexDirection: "row",
  },
  input: {
    borderRadius: 4,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    width: "75%",
  },
  button: {
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: "#51CA57",
    paddingVertical: 10,
    width: "25%",
    marginHorizontal: 8,
  },
  buttonText: {
    color: "#fff",
  },
  extra: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 64,
    width: "100%",
  },
  scoreText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  winContainer: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  winText: {
    color: "#FEA248",
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 32,
  },
  winButton: {
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: "#51CA57",
    paddingVertical: 10,
    paddingHorizontal: 32,
    marginHorizontal: 8,
  },
});
