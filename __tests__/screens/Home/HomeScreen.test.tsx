import React from "react";
import { render } from "@testing-library/react-native";
import HomeScreen from "../../../src/screens/Home/HomeScreen";
import { renderWithProviders } from "../../../src/utils/renderWithProviders.utility";


describe("HomeScreen component", () => {
  it("renders art items correctly", () => {    
    const { getAllByTestId } = renderWithProviders(<HomeScreen />, {
      preloadedState: {
        artworks: {
          data: [
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
          pagination: {
            current_page: 0,
            limit: 0,
            next_url: "",
            offset: 0,
            total: 0,
            total_pages: 0,
          },
          error: "",
          isFetching: true,
          status: "",
        },
      },
    });

    const artItems = getAllByTestId("ArtItemGoDetail");
    expect(artItems.length).toBeGreaterThan(0);
  });
});
