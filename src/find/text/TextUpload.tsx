import React from "react";

type TextUploadProps = {
  refreshArtists(artists: string[]): void;
};

export const TextUpload = ({
  refreshArtists,
}: TextUploadProps): JSX.Element => {
  const filesUploaded = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = (event.currentTarget.files as FileList)[0];
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const fileContents = e.target?.result;
      if (file.name.endsWith(".csv")) {
        const csvResult = fileContents
          ?.toString()
          .split(",")
          .map((value) => value.trim())
          .filter((value) => value.length > 0);
        refreshArtists(csvResult || []);
      } else {
        const txtResult = fileContents
          ?.toString()
          .split(/\n/g)
          .map((value) => value.trim())
          .filter((value) => value.length > 0);
        refreshArtists(txtResult || []);
      }
    };
    fileReader.readAsText(file);
  };

  return (
    <div>
      <p>
        <input type="file" id="fileUpload" onChange={filesUploaded} />
      </p>
    </div>
  );
};

export default TextUpload;
