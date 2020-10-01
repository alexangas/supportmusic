import React from "react";
import { Button, Form, Row, Col } from "react-bootstrap";

import { SpotifyFindService } from "../../services/SpotifyFindService";

type SpotifyTopArtistsProps = {
  refreshArtists(artists: ArtistReference[]): void;
};

type SpotifyTopArtistsState = {
  isLoadingArtists: boolean;
};

class SpotifyTopArtists extends React.Component<
  SpotifyTopArtistsProps,
  SpotifyTopArtistsState
> {
  private spotifyFindService: SpotifyFindService;

  constructor(props: SpotifyTopArtistsProps) {
    super(props);
    this.state = {
      isLoadingArtists: false,
    };
    this.spotifyFindService = SpotifyFindService.getInstance();
  }

  private getArtistsTop = async () => {
    this.setState({ isLoadingArtists: true });

    const results = await this.spotifyFindService.getUserArtistsTop();

    this.setState({ isLoadingArtists: false });
    this.props.refreshArtists(results);
  };

  render() {
    const { isLoadingArtists } = this.state;

    return (
      <Row className="mb-4">
        <Col>
          <Form>
            <Button
              disabled={isLoadingArtists}
              onClick={!isLoadingArtists ? this.getArtistsTop : () => {}}
              variant="primary"
            >
              {isLoadingArtists ? "Loading..." : "Get my top artists"}
            </Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default SpotifyTopArtists;
