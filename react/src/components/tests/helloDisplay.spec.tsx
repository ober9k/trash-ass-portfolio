import { render, screen, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import HelloDisplay from "./helloDisplay.tsx";
import "@testing-library/jest-dom/vitest";

describe("HelloDisplay", () => {

  afterEach(() => {
    cleanup();
  });

  it("should render a default greeting", () => {
    render(<HelloDisplay />);
    const element = screen.getByTestId("greeting");
    expect(element.textContent).toBe("Hello, World!");
  });

  it("should render a custom greeting", () => {
    const name = "John";
    render(<HelloDisplay name={name} />);
    const element = screen.getByTestId("greeting");
    expect(element.textContent).toBe(`Hello, ${name}!`);
  });

});
