import React from "react";
import { render } from "@testing-library/react";
import SpotifyAuthenticate from "./SpotifyAuthenticate";

test("renders button", () => {
  const { getByRole } = render(<SpotifyAuthenticate />);
  const element = getByRole("button");
  expect(element).toBeInTheDocument();
  expect(element).toHaveTextContent("Log");
});
