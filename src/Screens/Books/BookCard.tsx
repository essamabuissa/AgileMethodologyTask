import React from "react";
import { TouchableOpacity, Text, StyleSheet, Image, View } from "react-native";
import { BookCardProps } from "../../Common/Types";
const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    backgroundColor: "white",
    marginHorizontal: 20,
    marginVertical: 5,
    shadowOpacity: 0.1,
    padding: 10,
  },
  cardBody: {
    paddingHorizontal: 5,
  },

  numberOfPages: {
    fontWeight: "bold",
    fontSize: 10,
    marginTop: 5,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  subTitle: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: "bold",
  },
});

const BookCard = ({ onPress, book, thumbnail }: BookCardProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.cardBody}>
        <Text style={styles.title}>{book?.title}</Text>
        <Text style={styles.subTitle}>Published at {book?.publish_date}</Text>

        <Text style={styles.numberOfPages}>{book?.number_of_pages} Pages</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BookCard;
