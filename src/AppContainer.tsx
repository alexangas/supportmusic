import React from "react";
import { Link } from "react-router-dom";
import { Container, Tab, Tabs, Row, Col, CardColumns } from "react-bootstrap";
import { IoLogoGithub } from "react-icons/io";
import { FaTwitter } from "react-icons/fa";

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
        <Container as="main" role="main" className="pb-6">
          <Row className="mt-4">
            <Col lg="10" md="8" sm="6">
              <h1 className="display-3">
                <Link to="/">Support Music</Link>
                <span role="img" aria-label="Microphone">
                  🎤
                </span>
                {/*<span role="img" aria-label="Music note">🎵</span>*/}
                {/*<span role="img" aria-label="Headphones">🎧</span>*/}
              </h1>
              <p className="lead">
                Support the artists you listen to and buy from them online.
              </p>
            </Col>
          </Row>
          <section className="mt-3">
            <Row>
              <Col lg="12">
                <h2 className="display-4">Find artists</h2>
                <p>
                  Provide a list of artists you wish to support either from
                  Spotify, or upload artist names from your device.
                </p>
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
                  <Tab eventKey="text" title="Upload" className="px-3 py-4">
                    <TextUpload refreshArtists={this.refreshArtists} />
                  </Tab>
                </Tabs>
              </Col>
            </Row>
          </section>
          <section className="mt-3">
            {artists && (
              <>
                <Row>
                  <Col lg="12">
                    <h2 className="display-4">Support artists</h2>
                    <p>
                      Now, click on a link in the card below to find music and
                      merch!
                    </p>
                    <p>
                      Links to Bandcamp let you search there, but look for links
                      that are labelled "artist" to make sure you are supporting
                      them. Not all artists are available.
                    </p>
                  </Col>
                </Row>
                <CardColumns>
                  {artists.sort().map((artist) => (
                    <ArtistLink key={artist} artist={artist} />
                  ))}
                </CardColumns>
              </>
            )}
          </section>
        </Container>
        <footer className="fixed-bottom pb-4 text-muted">
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
