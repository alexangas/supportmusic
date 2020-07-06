import React from "react";
import { Button, Form, Row, Col } from "react-bootstrap";

import { SpotifyFindService } from "../../services/SpotifyFindService";

type SpotifyPlaylistsProps = {
  refreshArtists(artists: string[]): void;
  newQuery(): void;
};

type SpotifyPlaylistsState = {
  playlists?: PlaylistReference[];
  isLoadingPlaylists: boolean;
  isLoadingArtists: boolean;
};

class SpotifyPlaylists extends React.Component<
  SpotifyPlaylistsProps,
  SpotifyPlaylistsState
> {
  private spotifyFindService: SpotifyFindService;
  private readonly playlistElementId: string = "spotifyPlaylists";

  constructor(props: SpotifyPlaylistsProps) {
    super(props);
    this.state = {
      playlists: undefined,
      isLoadingPlaylists: false,
      isLoadingArtists: false,
    };
    this.spotifyFindService = SpotifyFindService.getInstance();
  }

  private getPlaylists = async () => {
    this.props.newQuery();
    this.setState({ isLoadingPlaylists: true });

    const results = (await this.spotifyFindService.getUserPlaylists()).sort(
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
    this.setState({ playlists: results, isLoadingPlaylists: false });
  };

  private getPlaylistArtists = async () => {
    this.setState({ isLoadingArtists: true });

    const playlistsElement = document.getElementById(
      this.playlistElementId
    ) as HTMLSelectElement;
    const selectedPlaylistId = playlistsElement.value;
    const results = await this.spotifyFindService.getPlaylistArtists(
      selectedPlaylistId
    );

    this.setState({ isLoadingArtists: false });
    this.props.refreshArtists(results);
  };

  render() {
    const { playlists, isLoadingPlaylists, isLoadingArtists } = this.state;

    return (
      <Row className="mb-4">
        <Col>
          <Form>
            <Button
              disabled={isLoadingPlaylists}
              onClick={!isLoadingPlaylists ? this.getPlaylists : () => {}}
              variant="primary"
            >
              {isLoadingPlaylists ? "Loading..." : "Get my playlists"}
            </Button>
            {playlists && (
              <Form.Group className="pt-2" as={Row}>
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
                  <Button
                    disabled={isLoadingArtists}
                    onClick={
                      !isLoadingArtists ? this.getPlaylistArtists : () => {}
                    }
                    variant="secondary"
                  >
                    {isLoadingArtists ? "Loading..." : "Get playlist artists"}
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
