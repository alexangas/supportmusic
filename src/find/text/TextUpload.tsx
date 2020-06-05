import React from "react";
import { Col, Form, Row } from "react-bootstrap";

type TextUploadProps = {
  refreshArtists(artists: string[]): void;
};

export const TextUpload = ({
  refreshArtists,
}: TextUploadProps): JSX.Element => {
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
      if (file.name.endsWith(".csv")) {
        const csvResult = fileContents
          ?.toString()
          .split(",")
          .map((value) => value.replace(/\W*/, "").trim())
          .filter(
            (value, _, result) => value.length > 0 && result.indexOf(value) >= 0
          );
        refreshArtists(csvResult || []);
      } else {
        const txtResult = fileContents
          ?.toString()
          .split(/\n/g)
          .map((value) => value.replace(/\W*/, "").trim())
          .filter(
            (value, _, result) => value.length > 0 && result.indexOf(value) >= 0
          );
        refreshArtists(txtResult || []);
      }
    };
    fileReader.readAsText(file);
  };

  return (
    <>
      <Row>
        <Col lg="12">
          <p>Upload a list of artists from your device without logging in!</p>
          <p>
            Either a plain text file with one artist per line, or a CSV file on
            one line is accepted.
          </p>
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
