import React from "react";
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
      <button onClick={authenticate}>Log in to Spotify</button>
    </div>
  );
};

export default SpotifyAuthenticate;
