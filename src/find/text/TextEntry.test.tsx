import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TextEntry from "./TextEntry";

const setup = () => {
  const refreshArtists = jest.fn();
  const utils = render(<TextEntry refreshArtists={refreshArtists} />);
  const textElement = utils.getByRole("textbox");
  const buttonElement = utils.getByRole("button");
  return {
    textElement,
    buttonElement,
    refreshArtists,
    ...utils,
  };
};

test("renders text entry", () => {
  const { textElement } = setup();
  expect(textElement).toBeInTheDocument();
});

test("submits blank artists for refresh", () => {
  const { buttonElement, refreshArtists } = setup();
  fireEvent.click(buttonElement);
  expect(refreshArtists).toBeCalledWith([]);
});

test("submits artists for refresh", () => {
  const { textElement, buttonElement, refreshArtists } = setup();
  const sampleArtists = ["ArtistA", "ArtistB", "ArtistC"];
  const expectedArtists = sampleArtists.map((s) => ({ name: s }));
  fireEvent.change(textElement, {
    target: { value: sampleArtists.join("\n") },
  });
  fireEvent.click(buttonElement);
  expect(refreshArtists).toBeCalledWith(expectedArtists);
});
