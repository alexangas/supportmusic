import React from "react";
import { LinkContainer } from 'react-router-bootstrap';
import {Button} from "react-bootstrap";

import { SpotifyFindService } from "../../services/SpotifyFindService";
import SpotifyAuthenticate from "./SpotifyAuthenticate";
import SpotifyTopArtists from "./SpotifyTopArtists";
import SpotifyPlaylists from "./SpotifyPlaylists";

type SpotifyFindProps = {
  refreshArtists(artists: string[]): void;
  newQuery(): void;
};

export const SpotifyFind = ({
  refreshArtists,
  newQuery,
}: SpotifyFindProps): JSX.Element => {
  const spotify = SpotifyFindService.getInstance();

  const isAuthenticated = () => {
    return spotify.isAuthenticated();
  };

  return (
    <>
      {!isAuthenticated() ? (
        <SpotifyAuthenticate />
      ) : (
        <>
          <SpotifyTopArtists refreshArtists={refreshArtists} />
          <SpotifyPlaylists
            refreshArtists={refreshArtists}
            newQuery={newQuery}
          />
          <LinkContainer to="/spotify/clearauth"><Button variant="secondary">Log out</Button></LinkContainer>
        </>
      )}
    </>
  );
};

export default SpotifyFind;
