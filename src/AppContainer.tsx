import React from "react";

import "./App.scss";
import { SpotifyFindService } from "./services/SpotifyFindService";
import SpotifyFind from "./find/spotify/SpotifyFind";
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
  };

  render() {
    const { artists } = this.state;

    return (
      <>
        <div className="App">
          <header>
            <h1>Support music</h1>
          </header>
          <section>
            <SpotifyFind
              refreshArtists={this.refreshArtists}
              newQuery={this.newQuery}
            />
          </section>
          <section>
            {artists &&
              artists
                .sort()
                .map((artist) => <ArtistLink key={artist} artist={artist} />)}
          </section>
          <footer>
            <div>
              Source available on{" "}
              <a href="https://github.com/alexangas/supportmusic">GitHub</a>.
            </div>
            <div>
              Project by <a href="https://alexangas.com">Alex Angas</a>.
            </div>
          </footer>
        </div>
      </>
    );
  }
}

export default AppContainer;
