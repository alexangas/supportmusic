import React from "react";
import { Link } from "react-router-dom";
import {Container, Jumbotron, Tab, Tabs, Row, Col, CardColumns} from "react-bootstrap";
import { IoLogoGithub } from "react-icons/io"

import "./App.scss";
import { SpotifyFindService } from "./services/SpotifyFindService";
import SpotifyFind from "./find/spotify/SpotifyFind";
import TextUpload from "./find/text/TextUpload";
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
        <Container>
          <Jumbotron>
            <h1>
              <Link to="/">Support Music</Link>
              <span role="img" aria-label="Microphone">🎤</span>
              {/*<span role="img" aria-label="Music note">🎵</span>*/}
              {/*<span role="img" aria-label="Headphones">🎧</span>*/}
            </h1>
          </Jumbotron>
          <section>
            <Tabs id="findArtists" defaultActiveKey="spotify">
              <Tab eventKey="spotify" title="Spotify">
                <SpotifyFind
                  refreshArtists={this.refreshArtists}
                  newQuery={this.newQuery}
                />
              </Tab>
              <Tab eventKey="text" title="Upload list">
                <TextUpload refreshArtists={this.refreshArtists} />
              </Tab>
            </Tabs>
          </section>
          <section>
            {artists &&
            <CardColumns>
              {artists
                .sort()
                .map((artist) => <ArtistLink key={artist} artist={artist} />)}
            </CardColumns>
            }
          </section>
          <footer>
            <Container>
              <Row>
                <Col>Source available on
                  {" "}
                  <IoLogoGithub />
                  {" "}
                  <a href="https://github.com/alexangas/supportmusic">GitHub</a>.
                </Col>
                <Col>
                  Feedback to <a href="https://www.alexangas.com/contact/">Alex Angas</a>.
                </Col>
              </Row>
            </Container>
            <div>

            </div>
            <div>

            </div>
          </footer>
        </Container>
      </>
    );
  }
}

export default AppContainer;
