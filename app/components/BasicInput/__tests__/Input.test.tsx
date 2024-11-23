import { fireEvent, render, screen } from "@testing-library/react-native";
import Input from "../Input";

describe("Input Component", () => {
  it("renders correctly", () => {
    const { getByPlaceholderText } = render(
      <Input label="Example" placeholder="Example" />
    );
    expect(getByPlaceholderText("Example")).toBeTruthy();
  });

  it("should show input with initial value set and change value", async () => {
    const onEventMock = jest.fn();

    render(
      <Input
        value="John Doe"
        label="Example"
        onChangeText={onEventMock}
        placeholder="Example"
      />
    );

    fireEvent(
      screen.getByPlaceholderText("Example"),
      "changeText",
      "This is a work of art!"
    );
    expect(onEventMock).toHaveBeenCalledWith("This is a work of art!");
  });
});
