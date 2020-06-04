import React from "react";
import {Button} from "react-bootstrap";

import { SpotifyFindService } from "../../services/SpotifyFindService";

type SpotifyPlaylistsProps = {
  refreshArtists(artists: string[]): void;
  newQuery(): void;
};

type SpotifyPlaylistsState = {
  playlists?: PlaylistReference[];
};

class SpotifyPlaylists extends React.Component<
  SpotifyPlaylistsProps,
  SpotifyPlaylistsState
> {
  private spotify: SpotifyFindService;

  constructor(props: SpotifyPlaylistsProps) {
    super(props);
    this.state = {
      playlists: undefined,
    };
    this.spotify = SpotifyFindService.getInstance();
  }

  private getPlaylistArtists = async () => {
    const playlistsElement = document.getElementById(
      "playlists"
    ) as HTMLSelectElement;
    const selectedPlaylistId = playlistsElement.value;
    const results = await this.spotify.getPlaylistArtists(selectedPlaylistId);
    this.props.refreshArtists(results);
  };

  private getPlaylists = async () => {
    this.props.newQuery();
    const results = await this.spotify.getUserPlaylists();
    this.setState({ playlists: results });
  };

  render() {
    const { playlists } = this.state;

    return (
      <>
        <Button onClick={this.getPlaylists} variant="primary">Get my playlists</Button>
        {playlists && (
          <>
            <label htmlFor="playlists">Playlists</label>
            <select id="playlists">
              {playlists?.map((playlist) => (
                <option key={playlist.id} value={playlist.id}>
                  {playlist.name}
                </option>
              ))}
            </select>
            <Button onClick={this.getPlaylistArtists} variant="secondary">
              Get playlist artists
            </Button>
          </>
        )}
      </>
    );
  }
}

export default SpotifyPlaylists;
