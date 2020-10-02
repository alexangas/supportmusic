import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

import { TextEntryService } from "../../services/TextEntryService";
import {SpotifyFindService} from "../../services/SpotifyFindService";

type TextEntryProps = {
  refreshArtists(artists: ArtistReference[]): void;
};

export const TextEntry = ({ refreshArtists }: TextEntryProps): JSX.Element => {
  const textEntryService = TextEntryService.getInstance();
  const spotifyFindService = SpotifyFindService.getInstance();
  const textEntryElementId: string = "artistsTextEntry";

  const artistsClick = () => {
    const textEntryElement = document.getElementById(
        textEntryElementId
    ) as HTMLTextAreaElement;
    const textContents = textEntryElement.value;
    const artists: ArtistReference[] = textContents
        ? textEntryService
            .getCleanedArtists(textContents.toString(), /\n/g)
            .map((name) => ({name}))
        : [];

    if (spotifyFindService.isAuthenticated()) {
      spotifyFindService.populateMissingArtistDetails(artists)
          .then(() => {
            refreshArtists(artists);
          });
    }
  }

  return (
    <>
      {/*<Row>*/}
      {/*  <Col lg="12">*/}
      {/*    <p>Type in the artists you wish to support.</p>*/}
      {/*  </Col>*/}
      {/*</Row>*/}
      <Row>
        <Col lg="12">
          <Form>
            <Form.Group controlId={textEntryElementId}>
              <Form.Label>Artists you wish to find:</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter one artist per line"
                rows={6}
                wrap={`off`}
              />
            </Form.Group>
            <Button variant="primary" onClick={artistsClick}>
              Refresh
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default TextEntry;
