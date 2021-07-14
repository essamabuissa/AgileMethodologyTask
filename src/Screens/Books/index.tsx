import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Button,
  ActivityIndicator,
  TextInput,
} from "react-native";
import BookCard from "./BookCard";
import { BOOK_DETAILS } from "../../Navigation/screenNames";
import { useQuery } from "react-query";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import IsbnCard from "../../Components/IsbnCard";

const styles = StyleSheet.create({
  button: {
    marginTop: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "lightblue",
    flexDirection: "row",
    shadowOpacity: 0.2,
  },
  buttonTitle: {
    fontWeight: "bold",
    color: "white",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    fontWeight: "bold",
    fontSize: 20,
  },
  icon: {
    position: "absolute",
    right: 0,
  },
  input: {
    borderWidth: 1,
    width: "50%",
    paddingVertical: 10,
    borderRadius: 10,
    paddingLeft: 10,
    borderColor: "gray",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  isbnList: {
    flexDirection: "row",
    display: "flex",
    flexWrap: "wrap",
  },
});
var manyBooks = [];
var manyBooksNew = [];
const Books = ({ navigation }) => {
  const [many, setMany] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [error, setError] = useState("");

  const navigateToBookDetails = (book) => {
    navigation.navigate(BOOK_DETAILS, { book: book.item, thumbnail });
  };

  const addToManyBooks = () => {
    if (manyBooks.includes(query)) {
      alert("You already added this ISBN, Add another one");
    } else if (query.length === 10 || query.length === 13) {
      manyBooks.push(query);
      setQuery("");
    } else {
      setError("ISBN must be between 10 or 13 ");
    }
  };
  const booksList = (book) => {
    return (
      <BookCard
        thumbnail={thumbnail}
        onPress={() => navigateToBookDetails(book)}
        book={book.item}
      />
    );
  };
  const changeValue = (value) => {
    setQuery(value);
  };

  const manageManySearch = () => {
    if (manyBooks.length === 0) {
      alert("Please enter ISBN");
    }
    setLoading(true);
    if (many) {
      setMany(false);
    } else {
      setMany(true);
    }
  };

  useQuery(
    "books",
    async () => {
      try {
        for (let i = 0; i < manyBooks.length; i++) {
          const res = await axios.get(
            `https://openlibrary.org/isbn/${manyBooks[i]}.json`
          );

          manyBooksNew.push(res.data);
          try {
            const res = await axios.get(
              `https://openlibrary.org/api/books?bibkeys=ISBN:${manyBooks[i]}&format=json`
            );
            const thumbnailUrl =
              res?.data[`ISBN:${manyBooks[i]}`].thußmbnail_url;
            setThumbnail(thumbnailUrl);
          } catch (error) {
            setError(error.message);
          }
        }
        manyBooks = [];
        setMany(false);
        setLoading(false);
      } catch (error) {
        manyBooks = [];
        setMany(false);
        setLoading(false);
        setError(error.message);
      }
    },
    {
      refetchInterval: many ? 1000 : false,
    }
  );

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Text style={styles.header}>Books</Text>

      <Text>Search One of More Books</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={query}
          onChangeText={(value) => {
            setQuery(value);
            setError("");
          }}
          keyboardType="number-pad"
          placeholder={"Enter ISBN then press +"}
          style={styles.input}
        />
        <TouchableOpacity onPress={addToManyBooks}>
          <Ionicons
            style={styles.icon}
            name="add-circle"
            size={35}
            color="green"
          />
        </TouchableOpacity>
      </View>
      {error ? <Text style={{ color: "red" }}>{error}</Text> : <View />}
      <View style={styles.isbnList}>
        {manyBooks.map((isbn) => {
          return <IsbnCard key={isbn} isbn={isbn} />;
        })}
      </View>
      <TouchableOpacity style={styles.button} onPress={manageManySearch}>
        <Text style={styles.buttonTitle}>Search</Text>
        {loading && <ActivityIndicator color="white" />}
      </TouchableOpacity>

      {manyBooksNew.length > 0 && (
        <FlatList
          style={{ width: "100%" }}
          data={manyBooksNew}
          renderItem={booksList}
          keyExtractor={(book) => book.id}
        />
      )}
    </View>
  );
};

export default Books;
