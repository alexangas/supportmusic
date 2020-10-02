import React from "react";
import { Link } from "react-router-dom";
import { Container, Tab, Tabs, Row, Col } from "react-bootstrap";
import { IoLogoGithub } from "react-icons/io";
import { FaTwitter } from "react-icons/fa";

import "./App.scss";
import { SpotifyFindService } from "./services/SpotifyFindService";
import SpotifyFind from "./find/spotify/SpotifyFind";
import TextEntry from "./find/text/TextEntry";
import TextUpload from "./find/text/TextUpload";
import {Results} from "./results/Results";

type AppState = {
  artists?: ArtistReference[];
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

  refreshArtists = (artists: ArtistReference[]) => {
    this.setState({ artists });
  };

  newQuery = () => {
    this.setState({ artists: undefined });
  };

  render() {
    const { artists } = this.state;

    return (
      <>
        <Container as="main" role="main" className="pb-5">
          <Row className="mt-4">
            <Col lg="10" md="8" sm="6">
              <h1 className="display-3">
                <Link to="/">Support Music</Link>
                <span role="img" aria-label="Microphone">
                  🎤
                </span>
              </h1>
              <p className="lead">
                Support artists you listen to and buy from them online!
              </p>
            </Col>
          </Row>
          <section className="mt-3">
            <Row>
              <Col lg="12">
                <h2 className="display-4">Find artists</h2>
                {/*<p>*/}
                {/*  Provide a list of artists you wish to support either from*/}
                {/*  Spotify, or upload artist names from your device.*/}
                {/*</p>*/}
              </Col>
            </Row>
            <Row>
              <Col lg="12">
                <Tabs id="findArtists" defaultActiveKey="spotify">
                  <Tab eventKey="spotify" title="Spotify" className="px-3 py-4">
                    <SpotifyFind
                      refreshArtists={this.refreshArtists}
                      newQuery={this.newQuery}
                    />
                  </Tab>
                  <Tab eventKey="textEntry" title="Text" className="px-3 py-4">
                    <TextEntry refreshArtists={this.refreshArtists} />
                  </Tab>
                  <Tab
                    eventKey="textUpload"
                    title="Upload"
                    className="px-3 py-4"
                  >
                    <TextUpload refreshArtists={this.refreshArtists} />
                  </Tab>
                </Tabs>
              </Col>
            </Row>
          </section>
          <section className="mt-3">
            <Results artists={artists} />
          </section>
        </Container>
        <footer className="pb-4 text-muted">
          <Container>
            <Row>
              <Col>
                <hr className="bg-light" />
              </Col>
            </Row>
            <Row className="mx-1">
              <Col>
                Project by{" "}
                <a href="https://www.alexangas.com/contact/">Alex Angas</a>.
              </Col>
              <Col>
                Feedback to{" "}
                <a href="https://github.com/alexangas/supportmusic/issues">
                  <IoLogoGithub /> GitHub
                </a>{" "}
                or{" "}
                <a href="https://twitter.com/alexangas">
                  <FaTwitter /> Twitter
                </a>
                .
              </Col>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default AppContainer;
