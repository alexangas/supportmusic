import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Form } from "react-bootstrap";

import { SpotifyFindService } from "../../services/SpotifyFindService";
import SpotifyTopArtists from "./SpotifyTopArtists";
import SpotifyPlaylists from "./SpotifyPlaylists";

type SpotifyFindProps = {
  refreshArtists(artists: ArtistReference[]): void;
  newQuery(): void;
};

export const SpotifyFind = ({
  refreshArtists,
  newQuery,
}: SpotifyFindProps): JSX.Element => {
  const spotifyFindService = SpotifyFindService.getInstance();

  const isAuthenticated = () => spotifyFindService.isAuthenticated();

  return (
    <>
      {!isAuthenticated() ? (
        <p>What did you do with Spotify</p>
      ) : (
        <>
          <SpotifyTopArtists refreshArtists={refreshArtists} />
          <SpotifyPlaylists
            refreshArtists={refreshArtists}
            newQuery={newQuery}
          />
          <Form className="mt-2">
            <LinkContainer to="/spotify/clearauth">
              <Button variant="outline-light">Log out of Spotify</Button>
            </LinkContainer>
          </Form>
        </>
      )}
    </>
  );
};

export default SpotifyFind;
