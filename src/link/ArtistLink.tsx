import React from "react";

type ArtistLinkProps = {
  artist: string;
};

export const ArtistLink = ({ artist }: ArtistLinkProps): JSX.Element => {
  return (
    <div>
      <p>{artist}</p>
      <a
        href={`https://bandcamp.com/search?q=${encodeURIComponent(artist)}`}
        target="_blank"
        rel="noreferrer noopener"
      >
        Bandcamp
      </a>
    </div>
  );
};

export default ArtistLink;
