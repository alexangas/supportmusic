import React from "react";
import { Col, Form, Row } from "react-bootstrap";

import { TextEntryService } from "../../services/TextEntryService";
import {SpotifyFindService} from "../../services/SpotifyFindService";

type TextUploadProps = {
  refreshArtists(artists: ArtistReference[]): void;
};

export const TextUpload = ({
  refreshArtists,
}: TextUploadProps): JSX.Element => {
  const textEntryService = TextEntryService.getInstance();
  const spotifyFindService = SpotifyFindService.getInstance();

  const filesUploaded = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = (event.currentTarget.files as FileList)[0];
    if (file.size > 5000) {
      // TODO: Error message
      refreshArtists([]);
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const fileContents = e.target?.result;
      const artists: ArtistReference[] = fileContents
          ? textEntryService
              .getCleanedArtists(fileContents.toString(), /\n/g)
              .map((name) => ({ name }))
          : [];

      if (spotifyFindService.isAuthenticated()) {
        spotifyFindService.populateMissingArtistDetails(artists)
            .then(() => {
              refreshArtists(artists);
            });
      }
    };
    fileReader.readAsText(file);
  };

  return (
    <>
      <Row>
        <Col lg="12">
          <p>Upload a list of artists!</p>
          <p>A plain text file with one artist per line is accepted.</p>
        </Col>
      </Row>
      <Row>
        <Col lg="12">
          <Form>
            <Form.File
              id="fileUpload"
              label="Choose a text file of artists to upload"
              custom
              onChange={filesUploaded}
            />
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default TextUpload;
