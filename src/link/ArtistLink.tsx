import React from "react";
import {Card, Button} from "react-bootstrap";
import {FaBandcamp} from "react-icons/all";

type ArtistLinkProps = {
  artist: string;
};

export const ArtistLink = ({ artist }: ArtistLinkProps): JSX.Element => {
  return (
    <Card>
        <Card.Body>
            <Card.Title>{artist}</Card.Title>
            <Button as="a"
                href={`https://bandcamp.com/search?q=${encodeURIComponent(artist)}`}
                target="_blank"
                rel="noreferrer noopener"
            >
                <FaBandcamp />{" "}Bandcamp
            </Button>
        </Card.Body>
    </Card>
  );
};

export default ArtistLink;
