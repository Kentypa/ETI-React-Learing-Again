import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "./Button";

describe("Button Component", () => {
  it("renders correctly with given text", () => {
    render(<Button variant="primary">Click Me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it("applies the disabled attribute when disabled is true", () => {
    render(
      <Button variant="primary" disabled>
        Submit
      </Button>,
    );
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });
});
