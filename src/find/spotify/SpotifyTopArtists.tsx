import React from "react";
import { SpotifyFindService } from "../../services/SpotifyFindService";

type SpotifyTopArtistsProps = {
  refreshArtists(artists: string[]): void;
};

export const SpotifyTopArtists = ({
  refreshArtists,
}: SpotifyTopArtistsProps): JSX.Element => {
  const spotify = SpotifyFindService.getInstance();

  const getArtistsTop = async () => {
    const results = await spotify.getUserArtistsTop();
    refreshArtists(results);
  };

  return (
    <div>
      <p>
        <button onClick={getArtistsTop}>Get my top artists</button>
      </p>
    </div>
  );
};

export default SpotifyTopArtists;
