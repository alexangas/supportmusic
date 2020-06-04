import React from "react";
import {Button} from "react-bootstrap";

import { SpotifyFindService } from "../../services/SpotifyFindService";

export const SpotifyAuthenticate = (): JSX.Element => {
  const spotify = SpotifyFindService.getInstance();

  const authenticate = () => {
    spotify.authenticate();
  };

  return (
    <div>
      <p>
        To find your artists in Spotify, this app needs access to your Spotify
        information. It only requests access for the bare minimum of what is
        needed to work. Details about you or your Spotify data are not stored
        anywhere and the app's access to it expires in a few minutes.
      </p>
      <Button onClick={authenticate} variant="primary">Log in to Spotify</Button>
    </div>
  );
};

export default SpotifyAuthenticate;
