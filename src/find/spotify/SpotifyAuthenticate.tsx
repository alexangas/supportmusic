import React from "react";
import { Button, Col, Row } from "react-bootstrap";

import { SpotifyFindService } from "../../services/SpotifyFindService";

export const SpotifyAuthenticate = (): JSX.Element => {
  const spotify = SpotifyFindService.getInstance();

  const authenticate = () => {
    spotify.authenticate();
  };

  return (
    <>
      <Row>
        <Col lg="12">
          <p>
            To find your artists in Spotify, this app needs access to your
            Spotify information.
          </p>
          <p className="text-muted">
            Minimal data in order to make the app work is requested. Your Spotify data
            is only stored within your browser while you use this
            page and not anywhere else. The app's access to Spotify expires in{" "}
            {SpotifyFindService.minutesAllowedToLogIn} minutes from when you log
            in.
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
