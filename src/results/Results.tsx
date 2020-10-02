import React from "react";
import { Row, Col, CardColumns } from "react-bootstrap";
import ArtistLink from "./ArtistLink";

type ResultsLinkProps = {
  artists?: ArtistReference[];
};

export const Results = ({ artists }: ResultsLinkProps): JSX.Element => {
  if (!artists) {
    return <></>;
  }

  return (
    <>
      <Row>
        <Col lg="12">
          <h2 className="display-4">Support artists</h2>
          <p>
            Now find music and merch! Results are sorted from least popular to
            most popular (where data is available).
          </p>
          <p>
            Bandcamp buttons start a search. Look for results labelled "artist"
            to make sure you are supporting them.
          </p>
        </Col>
      </Row>
      <CardColumns>
        {artists
          .sort(
            (artist1, artist2) =>
              (artist1.popularity ?? 0) - (artist2.popularity ?? 0)
          )
          .map((artist) => (
            <ArtistLink key={artist.spotifyId ?? artist.name} artist={artist} />
          ))}
      </CardColumns>
    </>
  );
};

export default ArtistLink;
