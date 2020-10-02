import React from "react";
import {Row, Col, CardColumns} from "react-bootstrap";
import ArtistLink from "./ArtistLink";
import {SpotifyFindService} from "../services/SpotifyFindService";

type ResultsLinkProps = {
  artists?: ArtistReference[];
};

export const Results = ({ artists }: ResultsLinkProps): JSX.Element => {
    const spotifyFindService = SpotifyFindService.getInstance();

    if (!artists) {
        return (<></>);
    }

    if (spotifyFindService.isAuthenticated()) {
        // Set artist IDs from Spotify if any are missing
        artists
            .filter((artist) => !artist.spotifyId)
            .forEach((artist) => spotifyFindService.searchArtist(artist.name)
                .then((foundArtist) => {
                    if (foundArtist) {
                        let updatedArtist = artists.find((artist) => artist.name === foundArtist.name);
                        if (updatedArtist) {
                            updatedArtist.spotifyId = foundArtist.spotifyId;
                        }
                    }
                }));
    }

    if (spotifyFindService.isAuthenticated()) {
        // Set popularity from Spotify if it is missing
    }

    return (
        <>
            <Row>
                <Col lg="12">
                    <h2 className="display-4">Support artists</h2>
                    <p>Now find music and merch!</p>
                    <p>
                        Bandcamp buttons start a search. Look for results labelled
                        "artist" to make sure you are supporting them.
                    </p>
                </Col>
            </Row>
            <CardColumns>
                {artists.sort().map((artist) => (
                    <ArtistLink key={artist.spotifyId ?? artist.name} artist={artist}/>
                ))}
            </CardColumns>
        </>
    );
};

export default ArtistLink;
