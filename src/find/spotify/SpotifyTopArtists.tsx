import React from "react";
import {Button} from "react-bootstrap";

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
    <>
      <Button onClick={getArtistsTop} variant="primary">Get my top artists</Button>
    </>
  );
};

export default SpotifyTopArtists;
