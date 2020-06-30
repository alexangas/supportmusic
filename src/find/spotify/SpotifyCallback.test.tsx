import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
import SpotifyCallback from "./SpotifyCallback";

test("renders explanation", () => {
  const { getByText } = render(<Router><SpotifyCallback /></Router>);
  const element = getByText(/Redirect/i);
  expect(element).toBeInTheDocument();
});
