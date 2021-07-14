import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
import { IsbnCardProps } from "../Common/Types";

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 2,
  },
});
const IsbnCard = ({ isbn, onPress }: IsbnCardProps) => {
  return (
    <View style={styles.card}>
      <Text>{isbn}</Text>
    </View>
  );
};
export default IsbnCard;
