import React from "react";

import "./App.scss";
import { SpotifyFindService } from "./services/SpotifyFindService";
import SpotifyAuthenticate from "./find/spotify/SpotifyAuthenticate";
import SpotifyTopArtists from "./find/spotify/SpotifyTopArtists";
import SpotifyPlaylists from "./find/spotify/SpotifyPlaylists";
import ArtistLink from "./link/ArtistLink";

type AppState = {
  artists?: string[];
};

class AppContainer extends React.Component<unknown, AppState> {
  private spotify: SpotifyFindService;

  constructor(props: unknown) {
    super(props);
    this.state = {
      artists: undefined,
    };
    this.spotify = SpotifyFindService.getInstance();
  }

  refreshArtists = (artists: string[]) => {
    this.setState({ artists });
  };

  newQuery = () => {
    this.setState({ artists: undefined });
  }

  render() {
    const { artists } = this.state;

    return (
      <>
        <div className="App">
          <header>
            <h1>Support music</h1>
          </header>
          <section>
            {!this.isAuthenticated() ? (
              <SpotifyAuthenticate />
            ) : (
              <>
                <SpotifyTopArtists refreshArtists={this.refreshArtists} />
                <SpotifyPlaylists refreshArtists={this.refreshArtists} newQuery={this.newQuery} />
              </>
            )}
          </section>
          <section>
            {artists &&
              artists
                .sort()
                .map((artist) => <ArtistLink key={artist} artist={artist} />)}
          </section>
        </div>
      </>
    );
  }

  private isAuthenticated = () => {
    return this.spotify.isAuthenticated();
  };
}

export default AppContainer;
