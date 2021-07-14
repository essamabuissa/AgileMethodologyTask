import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { BOOKS, BOOK_DETAILS } from "../../screenNames";

import Books from "../../../Screens/Books";
import BookDetails from "../../../Screens/Books/BookDetails";

const { Navigator, Screen } = createStackNavigator();

const BooksStack = () => {
  return (
    <Navigator>
      <Screen name={BOOKS} component={Books} options={{ headerShown: false }} />
      <Screen
        name={BOOK_DETAILS}
        component={BookDetails}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
};

export default BooksStack;
