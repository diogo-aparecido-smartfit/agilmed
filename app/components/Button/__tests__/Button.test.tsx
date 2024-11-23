import "jest-styled-components/native";
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";
import Button from "../Button";

describe("Button Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Button text="Click me" onPress={() => {}} />);
    expect(getByText("Click me")).toBeTruthy();
  });

  it("calls onPress function when pressed", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button text="Click me" onPress={onPressMock} />
    );
    fireEvent.press(getByText("Click me"));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it("Should have different style when disabled", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <Button text="Click me" onPress={onPressMock} disabled />
    );

    expect(getByTestId("button-container")).toHaveStyleRule("opacity", 0.5);
  });

  it("does not call onPress function when disabled", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button text="Click me" onPress={onPressMock} disabled />
    );
    fireEvent.press(getByText("Click me"));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it("should not call onPress function when isLoading", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <Button text="Click me" onPress={onPressMock} isLoading />
    );
    fireEvent.press(getByTestId("loading-button"));
    expect(onPressMock).not.toHaveBeenCalled();
  });
});
