import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import FavoritesScreen from "../../../src/screens/Favorite/FavoritesScreen";
import { renderWithProviders } from "../../../src/utils/renderWithProviders.utility";

describe("FavoritesScreen component", () => {
  const mockState = {
    preloadedState: {
      favorites: {
        favorites: [
          {
            id: 1,
            title: "Test Title",
            artist_display: "Test Artist",
            image_id: "test_image_id_1",
          },
          {
            id: 2,
            title: "Another Title",
            artist_display: "Another Artist",
            image_id: "test_image_id_2",
          },
        ],
      },
    },
  };

  it("renders art items correctly", () => {
    const { getAllByTestId } = renderWithProviders(
      <FavoritesScreen />,
      mockState
    );

    const artItems = getAllByTestId("ArtItemGoDetail");
    expect(artItems.length).toEqual(2);
  });

  it("navigates to DetailScreen when favorite art item is pressed", () => {
    const navigateMock = jest.fn();
    const navigation = { navigate: navigateMock };
    const { getByText } = renderWithProviders(
      <FavoritesScreen navigation={navigation} />,
      mockState
    );

    fireEvent.press(getByText("Test Title"));
    expect(navigateMock).toHaveBeenCalledWith("DetailScreen", {
      item: mockState.preloadedState.favorites.favorites.at(0),
    });
  });
});
