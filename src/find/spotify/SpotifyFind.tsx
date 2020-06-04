import React from "react";
import { Link } from "react-router-dom";
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
          <Link to="/spotify/clearauth">Log out</Link>
        </>
      )}
    </>
  );
};

export default SpotifyFind;
