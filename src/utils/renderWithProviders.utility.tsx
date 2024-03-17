/** Import React **/
import React from "react";

/** Import Libraries **/
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { render } from "@testing-library/react-native";

/** Import Reducers **/
import combineReducers from "@redux/reducers/reducers";

export const renderWithProviders = (
  ui: any,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: combineReducers,
      preloadedState,
    }),
    ...renderOptions
  }: any = {}
) => {
  const Wrapper = ({ children }: any) => {
    return <Provider store={store}>{children}</Provider>;
  };

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};
