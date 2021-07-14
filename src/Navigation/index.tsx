import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import BooksStack from "./StackNavigators/BooksStack";
import { BOOKS_STACK } from "./screenNames";

const { Navigator, Screen } = createStackNavigator();

// get from redux state later;
const isLoggedIn = false;

const RootNavigator = () => {
  return (
    <Navigator>
      <Screen
        name={BOOKS_STACK}
        component={BooksStack}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
};

export default RootNavigator;
