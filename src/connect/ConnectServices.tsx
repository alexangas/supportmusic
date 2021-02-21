import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Card, Col, Row } from "react-bootstrap";

import { SpotifyFindService } from "../services/SpotifyFindService";
import SpotifyLogo from "../images/spotify-icons-logos/logos/01_RGB/02_PNG/Spotify_Logo_RGB_Green.png";

export const ConnectServices = (): JSX.Element => {
  const spotifyFindService = SpotifyFindService.getInstance();

  const isAuthenticated = () => spotifyFindService.isAuthenticated();

  const authenticate = () => spotifyFindService.authenticate();

  return (
    <Row>
      <Col lg="auto">
        <Card>
          <Card.Body>
            <Card.Title>
              <img
                src={SpotifyLogo}
                alt="Spotify logo"
                // width="16"
                height="64"
                className="align-text-bottom"
              />
            </Card.Title>
            <Card.Text>Find your Spotify artists!</Card.Text>
            {!isAuthenticated() ? (
              <Button onClick={authenticate} variant="primary">
                Log in
              </Button>
            ) : (
              <LinkContainer to="/spotify/clearauth">
                <Button variant="outline-light">Log out</Button>
              </LinkContainer>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ConnectServices;
