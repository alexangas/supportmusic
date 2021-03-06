import React from "react";
import { Button, Col, Row } from "react-bootstrap";

import { SpotifyFindService } from "../../services/SpotifyFindService";

export const SpotifyAuthenticate = (): JSX.Element => {
  const spotifyFindService = SpotifyFindService.getInstance();

  const authenticate = () => {
    spotifyFindService.authenticate();
  };

  return (
    <>
      <Row>
        <Col lg="12">
          <p>
            To find artists in your Spotify, please log in to give this app
            access.
          </p>
          <p className="text-muted">
            Minimal data in order to make the app work is requested. Your
            Spotify data is only stored within your browser while you use this
            page and not anywhere else.
          </p>
        </Col>
      </Row>
      <Row>
        <Col lg="12">
          <Button onClick={authenticate} variant="primary">
            Log in to Spotify
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default SpotifyAuthenticate;
