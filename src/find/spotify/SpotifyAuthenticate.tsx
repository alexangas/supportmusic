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
            Only the bare minimum request to make this app work is made. Details
            about you or your Spotify data are only stored while you use this
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
