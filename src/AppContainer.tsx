import React from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardActions,
    CssBaseline,
    Container,
    InputLabel,
    NativeSelect,
} from "@material-ui/core";

import "./App.scss";
import { SpotifyFindService } from "./services/SpotifyFindService";

type AppState = {
    artists?: string[];
    playlists?: PlaylistReference[];
    selectedPlaylistId?: string;
};

class AppContainer extends React.Component<unknown, AppState> {
    private spotify: SpotifyFindService;

    constructor(props: unknown) {
        super(props);
        this.state = {
            artists: undefined,
            playlists: undefined,
            selectedPlaylistId: undefined,
        };
        this.spotify = new SpotifyFindService();
        // this.authenticationCallback();
    }

    render() {
        const { artists, playlists } = this.state;

        return (
            <>
                <CssBaseline />
                <div className="App">
                    <Container>
                        <header>
                            <h1>Support music</h1>
                        </header>
                        <section>
                            <h2>Find</h2>
                            {!this.isAuthenticated() ? (
                                <Box>
                                    <p>
                                        To find your artists in Spotify, this app needs access to
                                        your Spotify information. It only requests access for the
                                        bare minimum of what is needed to work. Details about you or
                                        your Spotify data are not stored anywhere and the app's
                                        access to it expires in a few minutes.
                                    </p>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={this.authenticate}
                                    >
                                        Log in to Spotify
                                    </Button>
                                </Box>
                            ) : (
                                <>
                                    <p>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={this.getArtistsTop}
                                        >
                                            Get my top artists
                                        </Button>
                                    </p>
                                    <p>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={this.getPlaylists}
                                        >
                                            Get my playlists
                                        </Button>
                                        {playlists && (
                                            <>
                                                <InputLabel htmlFor="playlists">Playlists</InputLabel>
                                                <NativeSelect
                                                    id="playlists"
                                                    onChange={(event) =>
                                                        this.setState({
                                                            selectedPlaylistId: event.currentTarget.value,
                                                        })
                                                    }
                                                >
                                                    {playlists.map((playlist) => (
                                                        <option key={playlist.name} value={playlist.id}>
                                                            {playlist.name}
                                                        </option>
                                                    ))}
                                                </NativeSelect>
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    onClick={this.getPlaylistArtists}
                                                >
                                                    Get playlist artists
                                                </Button>
                                            </>
                                        )}
                                    </p>
                                </>
                            )}
                        </section>
                        <section>
                            <h2>Support</h2>
                            {artists &&
                            artists.sort().map((artist) => (
                                <Card>
                                    <CardContent>{artist}</CardContent>
                                    <CardActions>
                                        <Button
                                            variant="text"
                                            color="default"
                                            key={artist}
                                            title={artist}
                                            onClick={this.findArtist}
                                        >
                                            Bandcamp
                                        </Button>
                                    </CardActions>
                                </Card>
                            ))}
                        </section>
                    </Container>
                </div>
            </>
        );
    }

    private clearState = () => {
        this.setState({
            artists: undefined,
            playlists: undefined,
            selectedPlaylistId: undefined,
        });
    };

    private isAuthenticated = () => {
        return this.spotify.isAuthenticated();
    };

    private authenticate = () => {
        this.spotify.authenticate();
    };

    private authenticationCallback = () => {
        if (!window.location.hash) {
            return;
        }
        try {
            this.spotify.authenticationCallback(window.location.hash);
        } catch (err) {
            this.clearState();
            this.reportError(err);
        }
    };

    private getArtistsTop = async () => {
        this.clearState();
        let results;
        try {
            results = await this.spotify.getUserArtistsTop();
        } catch (err) {
            this.clearState();
            this.reportError(err);
            return;
        }
        this.setState({ artists: results });
    };

    private getPlaylists = async () => {
        this.clearState();
        let results;
        try {
            results = await this.spotify.getUserPlaylists();
        } catch (err) {
            this.clearState();
            this.reportError(err);
            return;
        }
        this.setState({ playlists: results });
    };

    private getPlaylistArtists = async () => {
        const { selectedPlaylistId } = this.state;
        let results;
        try {
            results = await this.spotify.getPlaylistArtists(
                selectedPlaylistId as string
            );
        } catch (err) {
            this.clearState();
            this.reportError(err);
            return;
        }
        this.setState({ artists: results });
    };

    private findArtist = (event: React.MouseEvent<HTMLButtonElement>) => {
        const artist = event.currentTarget.title;
        window.open(`https://bandcamp.com/search?q=${encodeURIComponent(artist)}`);
    };

    private reportError = (err: Error) => {
        console.error(err);
    };
}

export default AppContainer;
