import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaExternalLinkAlt } from "react-icons/all";
import BandcampButton from "../images/bandcamp-button-circle-whitecolor/bandcamp-button-circle-whitecolor-32.png";

type ArtistLinkProps = {
  artist: ArtistReference;
};

export const ArtistLink = ({ artist }: ArtistLinkProps): JSX.Element => {
  return (
    <Card data-popularity={artist.popularity}>
      <Card.Header>{artist.name}</Card.Header>
      <Card.Body>
        <Button
          as="a"
          href={`https://bandcamp.com/search?q=${encodeURIComponent(
            artist.name
          )}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          <img
            src={BandcampButton}
            alt="Bandcamp button"
            width="16"
            height="16"
            className="align-text-bottom"
          />
          <span className="px-2">Bandcamp</span>
          <FaExternalLinkAlt />
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ArtistLink;
