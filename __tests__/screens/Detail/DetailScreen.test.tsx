import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import DetailScreen from "../../../src/screens/Detail/DetailScreen";
import { renderWithProviders } from "../../../src/utils/renderWithProviders.utility";
import { addCalendarEvent } from "../../../src/components/NativeModules/CalendarModule";

jest.mock("../../../src/components/NativeModules/CalendarModule", () => ({
  addCalendarEvent: jest.fn(() => Promise.resolve(true)),
}));

describe("DetailScreen component", () => {
  const mockItem = {
    id: 1,
    title: "Test Title",
    artist_display: "Test Artist",
    image_id: "test_image_id",
    description: "description art",
  };

  it("displays art details correctly", async () => {
    const { getByText } = renderWithProviders(
      <DetailScreen route={{ params: { item: mockItem } }} />
    );
    expect(getByText("Test Artist")).toBeTruthy();
    expect(getByText("description art")).toBeTruthy();
  });

  it("adds an event to the calendar when button is pressed", async () => {
    const { getByText } = renderWithProviders(
      <DetailScreen route={{ params: { item: mockItem } }} />
    );
    fireEvent.press(getByText("Set a reminder to visit it."));

    expect(addCalendarEvent).toHaveBeenCalledWith(
      "Remember to visit the artwork: Test Title",
      expect.any(Number),
      expect.any(Number),
      "Test Artist"
    );
  });
});
