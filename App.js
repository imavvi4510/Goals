import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  ToastAndroid,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function App() {
  const [text, setText] = useState("");
  const [goals, setGoals] = useState([]);

  const appendGoal = (newGoal) => {
    if (newGoal) {
      setGoals((prevGoals) => {
        if (prevGoals.find((e) => e === newGoal)) {
          ToastAndroid.show(
            "don't add  goals that already exists 😵",
            ToastAndroid.LONG
          );
          return prevGoals;
        } else {
          return [...prevGoals, newGoal];
        }
      });
    } else {
      ToastAndroid.show("Cannot add empty goals! 😵", ToastAndroid.LONG);
    }
    setText(""); //this will clear the text input
  };

  const onDeleteGoal = (e, index) => {
    Alert.alert(
      "Are you sure you want to delete it?",
      `${e} at ${index}`,
      [
        {
          text: "No, Keep it",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Yes, Delete it",
          onPress: () =>
            setGoals((prevGoals) => prevGoals.filter((_, j) => j !== index)),
        },
      ],
      { cancelable: false }
    );
  };

  const onChangeText = (newText) => {
    setText(newText);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="course goal"
          onChangeText={(newText) => onChangeText(newText)}
          value={text}
        />
      </View>
      <View style={{ padding: 50 }}>
        <Button title="ADD" onPress={() => appendGoal(text)}></Button>
        <Button title="CLEAR" onPress={() => onChangeText("")}></Button>
      </View>
      <View>
        {goals.length > 0 ? (
          goals.map((e, index) => (
            <View key={`${e}-${index}`} style={styles.goalContainer}>
              <Text>{e}</Text>
              <AntDesign
                name="closecircleo"
                size={20}
                color="red"
                onPress={() => onDeleteGoal(e, index)}
              />
            </View>
          ))
        ) : (
          <Text>Add Goals to view them here</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    width: "100%",
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
  },
  goalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 8,
  },
});

//avoid same goal repetition and warn by showing toast
