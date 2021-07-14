import React from "react";
import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";

const styles = StyleSheet.create({
  bookName: {
    fontWeight: "bold",
    fontSize: 25,
    marginTop: 10,
  },
  container: {
    flex: 1,
  },
  description: {
    fontSize: 17,
    fontWeight: "600",
  },
  descriptionText: {
    fontWeight: "bold",
    fontSize: 17,
    color: "rgb(70,70,70)",
    marginTop: 15,
  },
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
      {thumbnail ? (
        <Image
          style={styles.image}
          source={{
            url: thumbnail,
          }}
        />
      ) : (
        <SafeAreaView />
      )}
      <View style={styles.innerContainer}>
        <Text style={styles.bookName}>{book?.title}</Text>
        <Text style={styles.descriptionText}>Description</Text>
        <Text style={styles.description}>
          {book?.subtitle ? book?.subtitle : "No description"}.
        </Text>
        <Text style={styles.descriptionText}>Publish Date</Text>
        <Text style={styles.description}>{book?.publish_date}.</Text>
        <Text style={styles.descriptionText}>Number Of Pages</Text>
        <Text style={styles.description}>
          {book?.numner_of_pages ? book?.numner_of_pages : "Not Available"}
        </Text>
      </View>
    </View>
  );
};

export default BookDetails;
