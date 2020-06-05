import React from "react";
import {Form} from "react-bootstrap";

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
    <Form>
      <Form.File id="fileUpload" label="Choose text file of artists to upload" custom onChange={filesUploaded} />
    </Form>
  );
};

export default TextUpload;
