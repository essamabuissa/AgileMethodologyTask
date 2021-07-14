import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Button,
  TextInput,
} from "react-native";
import BookCard from "./BookCard";
import { BOOK_DETAILS } from "../../Navigation/screenNames";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    fontWeight: "bold",
    fontSize: 20,
  },
  input: {
    borderWidth: 1,
    width: "50%",
    paddingVertical: 10,
    borderRadius: 10,
    paddingLeft: 10,
  },
});
//https://openlibrary.org/api/books?bibkeys=ISBN:0385472579&format=json
const Books = ({ navigation }) => {
  const [intervalMs, setIntervalMs] = React.useState(1000);
  const [query, setQuery] = useState("");
  const [multipleBooks, setMultipleBooks] = useState([]);
  const [thumbnail, setThumbnail] = useState("");
  //   console.log(thumbnail, "thhhhhh");
  const queryClient = useQueryClient();
  //   const [data, setData] = useState();
  const { isLoading, error, data } = useQuery(
    "books",
    async () => {
      try {
        const res = await axios.get(
          `https://openlibrary.org/isbn/${query}.json`
        );
        try {
          const res = await axios.get(
            `https://openlibrary.org/api/books?bibkeys=ISBN:${query}&format=json`
          );
          const thumbnailUrl = res?.data[`ISBN:${query}`]?.thumbnail_url;
        } catch (error) {}
        return res;
      } catch (error) {
        console.log(error, "error");
      }
    },

    {
      // Refetch the data every second
      retryOnMount: true,

      //   refetchInterval: query.length === 10 || query.length === 13 ? 500 : false,
    }
  );

  const navigateToBookDetails = (book) => {
    navigation.navigate(BOOK_DETAILS, { book: data?.data, thumbnail });
  };

  //   const booksList = (book) => {
  //     return (
  //       <BookCard book={book.item} onPress={() => navigateToBookDetails(book)} />
  //     );
  //   };
  const changeValue = (value) => {
    setQuery(value);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Text style={styles.header}>Books</Text>
      <TextInput
        onChangeText={setQuery}
        keyboardType="number-pad"
        placeholder={"Search"}
        style={styles.input}
      />
      <TextInput
        // onChangeText={setQueryTwo}
        keyboardType="number-pad"
        placeholder={"Search"}
        style={styles.input}
      />
      <Button title="add serial" backgroundColor="red" />
      {data?.data?.title && (
        <BookCard
          thumbnail={thumbnail}
          book={data?.data}
          onPress={navigateToBookDetails}
        />
      )}
      {/* <FlatList
        contentContainerStyle={{
          flex: 1,
        }}
        data={books}
        renderItem={booksList}
        numColumns={2}
        keyExtractor={(book) => book.id}
      /> */}
    </View>
  );
};

export default Books;
