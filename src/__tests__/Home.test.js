/* eslint-disable no-undef */
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Searchbar from "../component/Searchbar/Searchbar";

describe("Component Searchbar", () => {
  test("Render Searchbar", () => {
    render(<Searchbar />);
    expect(screen.getByPlaceholderText("Cari...")).toBeInTheDocument("");
  });

  test("Render Searchbar dengan nilai kosong", () => {
    const handleChange = jest.fn();
    render(<Searchbar handleSearch={handleChange} />);
    const inputField = screen.getByPlaceholderText("Cari...");
    expect(inputField.value).toBe("");
  });

  test("Render Searchbar dan ganti nilainya", () => {
    const handleChange = jest.fn();
    render(<Searchbar handleSearch={handleChange} />);
    const inputField = screen.getByPlaceholderText("Cari...");

    fireEvent.change(inputField, { target: { value: "Test" } });
    expect(inputField.value).toBe("Test");
  });

  test("Render Searchbar dengan nilai and kosongkan", () => {
    const handleChange = jest.fn();
    const handleClear = jest.fn();

    render(
      <Searchbar
        value="Test"
        onChange={handleChange}
        onClearSearch={handleClear}
      />
    );

    const inputField = screen.getByPlaceholderText("Cari...");
    expect(inputField.value).toBe("Test");

    const clearButton = screen.getByTestId("bersihkan");
    expect(clearButton).toBeInTheDocument();

    fireEvent.click(clearButton);
    expect(handleClear).toHaveBeenCalledTimes(1);
  });
});
