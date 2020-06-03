import React from "react";
import "./App.scss";
import { SpotifyFindService } from "./services/SpotifyFindService";

type AppState = {
  artists?: string[];
  playlists?: PlaylistReference[];
  selectedPlaylist?: string;
};

class App extends React.Component<unknown, AppState> {
  private spotify: SpotifyFindService = new SpotifyFindService();

  constructor(props: unknown) {
    super(props);
    this.state = {
      artists: undefined,
      playlists: undefined,
      selectedPlaylist: undefined,
    };
    this.spotify = new SpotifyFindService();
    this.authenticationCallback();
  }

  render() {
    const { artists, playlists } = this.state;

    return (
      <div className="App">
        <header>
          <h1>Support music</h1>
        </header>
        <section>
          <h2>Find</h2>
          {this.isAuthenticated() ? (
            <>
              <p>
                <button onClick={this.getArtistsTop}>Get artists</button>
              </p>
              <p>
                <button onClick={this.getPlaylists}>Get playlists</button>
                {playlists && (
                  <select onChange={this.getPlaylistArtists}>
                    {playlists.map((playlist) => (
                      <option key={playlist.name} value={playlist.id}>
                        {playlist.name}
                      </option>
                    ))}
                  </select>
                )}
              </p>
            </>
          ) : (
            <p>
              <button onClick={this.authenticate}>Authenticate</button>
            </p>
          )}
        </section>
        <section>
          <h2>Support</h2>
          {artists &&
            artists.map((artist) => (
              <button key={artist} title={artist} onClick={this.findArtist}>
                {artist}
              </button>
            ))}
        </section>
      </div>
    );
  }

  private clearState = () => {
    this.setState({
      artists: undefined,
      playlists: undefined,
      selectedPlaylist: undefined,
    });
  };

  private isAuthenticated = () => {
    return this.spotify.isAuthenticated();
  };

  private authenticate = () => {
    this.spotify.authenticate();
  };

  private authenticationCallback = () => {
    if (!window.location.hash) {
      return;
    }
    try {
      this.spotify.authenticationCallback(window.location.hash);
    } catch (err) {
      this.clearState();
      this.reportError(err);
    }
  };

  private getArtistsTop = async () => {
    this.clearState();
    let results;
    try {
      results = await this.spotify.getUserArtistsTop();
    } catch (err) {
      this.clearState();
      this.reportError(err);
      return;
    }
    this.setState({ artists: results });
  };

  private getPlaylists = async () => {
    this.clearState();
    let results;
    try {
      results = await this.spotify.getUserPlaylists();
    } catch (err) {
      this.clearState();
      this.reportError(err);
      return;
    }
    this.setState({ playlists: results });
  };

  private getPlaylistArtists = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const playlistId = event.currentTarget.value;
    let results;
    try {
      results = await this.spotify.getPlaylistArtists(playlistId);
    } catch (err) {
      this.clearState();
      this.reportError(err);
      return;
    }
    this.setState({ artists: results });
  };

  private findArtist = (event: React.MouseEvent<HTMLButtonElement>) => {
    const artist = event.currentTarget.title;
    window.open(`https://bandcamp.com/search?q=${encodeURIComponent(artist)}`);
  };

  private reportError = (err: Error) => {
    console.error(err);
  }
}

export default App;
