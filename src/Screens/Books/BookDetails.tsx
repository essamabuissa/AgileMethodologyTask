import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const styles = StyleSheet.create({
  bookName: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
  },
  container: {
    flex: 1,
  },
  description: {},
  image: {
    width: "100%",
    height: "25%",
    borderWidth: 0,
  },
  innerContainer: {
    paddingHorizontal: 16,
  },
});

const BookDetails = ({ route }) => {
  const { book, thumbnail } = route.params;
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          url: thumbnail,
        }}
      />
      <View style={styles.innerContainer}>
        <Text style={styles.bookName}>{book?.title}</Text>
        <Text style={styles.bookName}>Description</Text>
        <Text style={styles.description}>{book?.subtitle}.</Text>
      </View>
    </View>
  );
};

export default BookDetails;
