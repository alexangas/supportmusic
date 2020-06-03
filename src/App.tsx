import React from "react";
import queryString from "query-string";
import SpotifyWebApi from "spotify-web-api-js";
import "./App.scss";

let spotify = new SpotifyWebApi();

type PlaylistReference = {
  name: string;
  id: string;
};

type AppState = {
  artists?: string[];
  playlists?: PlaylistReference[];
  selectedPlaylist?: string;
};

class App extends React.Component<unknown, AppState> {
  constructor() {
    super(null);
    this.state = {
      artists: undefined,
      playlists: undefined,
      selectedPlaylist: undefined,
    };
    this.authenticationCallback();
  }

  render() {
    const { artists, playlists } = this.state;

    return (
      <div className="App">
        <header>
          <h1>Scamplify</h1>
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
                  <select onChange={this.getPlaylist}>
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
    return spotify.getAccessToken();
  };

  private authenticate = () => {
    const redirectUri = `http://localhost:3000/`;
    const scopes = [
      "playlist-read-private",
      "playlist-read-collaborative",
      "user-top-read",
      "user-read-recently-played",
    ];
    const state = `123`;
    window.location.href = `https://accounts.spotify.com/authorize?client_id=f3dfad56fac44b20ab4d43bf912c29ce&redirect_uri=${redirectUri}&scope=${scopes.join(
      "%20"
    )}&response_type=token&state=${state}`;
  };

  private authenticationCallback = () => {
    if (!window.location.hash) {
      return;
    }
    const parsedHash = queryString.parse(window.location.hash);
    const token = parsedHash["access_token"] as string;
    spotify.setAccessToken(token);
  };

  private clearAuthentication = () => {
    spotify.setAccessToken(null);
    this.clearState();
  };

  private getArtistsTop = async () => {
    this.clearState();
    let response;
    try {
      response = await spotify.getMyTopArtists();
    } catch (err) {
      this.clearAuthentication();
      return;
    }
    const artists = response.items.map((itemResponse) => itemResponse.name);
    this.setState({ artists });
  };

  private getPlaylists = async () => {
    this.clearState();
    let response;
    try {
      response = await spotify.getUserPlaylists();
    } catch (err) {
      this.clearAuthentication();
      return;
    }
    const playlists = response.items.map((itemResponse) => ({
      name: itemResponse.name,
      id: itemResponse.id,
    }));
    this.setState({ playlists });
  };

  private getPlaylist = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const playlistId = event.currentTarget.value;
    let response;
    try {
      response = await spotify.getPlaylist(playlistId);
    } catch (err) {
      this.clearAuthentication();
      return;
    }
    console.log(response);
    const artists = response.tracks.items.map((trackItemResponse) => {
      const track = trackItemResponse.track as SpotifyApi.TrackObjectFull;
      //return track.artists.map((artist) => artist.name);
      return track.artists[0].name;
    });
    //console.log(artists);
    const artistSet = new Set(artists);
    const newArtists = Array.from(artistSet);
    console.log(newArtists);
    this.setState({ artists: newArtists });
  };

  private findArtist = (event: React.MouseEvent<HTMLButtonElement>) => {
    const artist = event.currentTarget.title;
    window.open(`https://bandcamp.com/search?q=${encodeURIComponent(artist)}`);
  };
}

export default App;
