import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ArtItem from "../../../src/components/ArtItem/ArtItem";
import { renderWithProviders } from "../../../src/utils/renderWithProviders.utility";

import { useDispatch } from "react-redux";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

describe("ArtItem component", () => {
  it("displays the correct title", () => {
    const item = {
      id: 1,
      title: "Test Title",
      artist_display: "Test Artist",
      image_id: "test_image_id",
    };
    const { getByText } = renderWithProviders(<ArtItem item={item} />);
    expect(getByText("Test Title")).toBeTruthy();
  });

  it("displays the correct artist name", () => {
    const item = {
      id: 1,
      title: "Test Title",
      artist_display: "Test Artist",
      image_id: "test_image_id",
    };
    const { getByText } = renderWithProviders(<ArtItem item={item} />);
    expect(getByText("By: Test Artist")).toBeTruthy();
  });

  it("calls onPressMock function when Go to Art Detail button is pressed", () => {
    const item = {
      id: 1,
      title: "Test Title",
      artist_display: "Test Artist",
      image_id: "test_image_id",
    };
    const onPressMock = jest.fn();
    const { getByTestId } = renderWithProviders(
      <ArtItem item={item} onPress={onPressMock} />
    );
    fireEvent.press(getByTestId("ArtItemGoDetail"));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it("calls dispatch with addToFavorites action when Add to Favorites button is pressed", () => {
    const item = {
      id: 1,
      title: "Test Title",
      artist_display: "Test Artist",
      image_id: "test_image_id",
    };
    const dispatchMock = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(dispatchMock);

    const { getByTestId } = renderWithProviders(
      <ArtItem item={item} origin="Test" />
    );
    const addToFavoritesButton = getByTestId("ActionButton");
    fireEvent.press(addToFavoritesButton);

    expect(dispatchMock).toHaveBeenCalledWith({
      payload: { artwork: item },
      type: "favorites/addToFavorites",
    });
  });
});
