import React from "react";
import { Button, Form, Row, Col } from "react-bootstrap";

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
  private readonly playlistElementId: string = "spotifyPlaylists";

  constructor(props: SpotifyPlaylistsProps) {
    super(props);
    this.state = {
      playlists: undefined,
    };
    this.spotify = SpotifyFindService.getInstance();
  }

  private getPlaylistArtists = async () => {
    const playlistsElement = document.getElementById(
      this.playlistElementId
    ) as HTMLSelectElement;
    const selectedPlaylistId = playlistsElement.value;
    const results = await this.spotify.getPlaylistArtists(selectedPlaylistId);
    this.props.refreshArtists(results);
  };

  private getPlaylists = async () => {
    this.props.newQuery();
    const results = (await this.spotify.getUserPlaylists()).sort(
      (refa, refb) => {
        if (refa.name > refb.name) {
          return 1;
        }
        if (refa.name < refb.name) {
          return -1;
        }
        return 0;
      }
    );
    this.setState({ playlists: results });
  };

  render() {
    const { playlists } = this.state;

    return (
      <Row className="mb-4">
        <Col>
          <Form>
            <Button onClick={this.getPlaylists} variant="primary">
              Get my playlists
            </Button>
            {playlists && (
              <Form.Group
                className="pt-2"
                as={Row}
              >
                <Col xs="auto">
                  <Form.Label htmlFor={this.playlistElementId} srOnly>
                    Playlists
                  </Form.Label>
                  <Form.Control as="select" id={this.playlistElementId}>
                    {playlists?.map((playlist) => (
                      <option key={playlist.id} value={playlist.id}>
                        {playlist.name}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
                <Col xs="auto">
                  <Button onClick={this.getPlaylistArtists} variant="secondary">
                    Get playlist artists
                  </Button>
                </Col>
              </Form.Group>
            )}
          </Form>
        </Col>
      </Row>
    );
  }
}

export default SpotifyPlaylists;
