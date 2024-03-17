import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import Button from "../../../src/components/Button/Button";
import { styles } from "../../../src/components/Button/Button.Style";
import { COLORS } from "../../../src/constants/colors";

describe("Button component", () => {
  it("renders correctly", () => {
    const { getByText } = render(
      <Button label="Test Button" onPress={() => {}} type="primary" />
    );
    expect(getByText("Test Button")).toBeTruthy();
  });

  it("calls onPress function when clicked", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button label="Test Button" onPress={onPressMock} type="primary" />
    );
    fireEvent.press(getByText("Test Button"));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it("applies correct styles based on button type", () => {
    const { getByTestId } = render(
      <Button label="Test Button" onPress={() => {}} type="primary" />
    );
    const button = getByTestId("ActionButton");
    expect(button).toHaveStyle(styles.primary);
  });
});
