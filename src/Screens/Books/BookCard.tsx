import React from "react";
import { TouchableOpacity, Text, StyleSheet, Image, View } from "react-native";

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    width: "50%",
    height: "25%",
  },
  cardBody: {
    paddingHorizontal: 5,
  },
  image: {
    height: "50%",
    borderWidth: 0,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  numberOfPages: {
    fontWeight: "bold",
  },
});

const BookCard = ({ onPress, book, thumbnail }) => {
  console.log(book, "card");
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image
        style={styles.image}
        source={{
          url: thumbnail,
        }}
      />
      <View style={styles.cardBody}>
        <Text style={styles.title}>{book?.title}</Text>
        <Text>{book?.subtitle}</Text>
        <Text style={styles.numberOfPages}>
          Number of pages:
          <Text style={{ fontWeight: "normal", paddingLeft: 20 }}>
            {book?.number_of_pages}
          </Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default BookCard;
