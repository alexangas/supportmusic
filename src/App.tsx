import React from "react";
import { Route } from "react-router-dom";

import "./App.scss";
import SpotifyCallback from "./find/spotify/SpotifyCallback";
import AppContainer from "./AppContainer";
import SpotifyClearAuth from "./find/spotify/SpotifyClearAuth";

type AppState = {
  artists?: string[];
  playlists?: PlaylistReference[];
  selectedPlaylistId?: string;
};

class App extends React.Component<unknown, AppState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      artists: undefined,
      playlists: undefined,
      selectedPlaylistId: undefined,
    };
  }

  render() {
    return (
      <>
        <Route exact path="/" component={AppContainer} />
        <Route exact path="/spotify/callback" component={SpotifyCallback} />
        <Route exact path="/spotify/clearauth" component={SpotifyClearAuth} />
      </>
    );
  }
}

export default App;
