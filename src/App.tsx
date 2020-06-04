import React from "react";
import { Route } from "react-router-dom";

import "./App.scss";
import AppContainer from "./AppContainer";
import SpotifyCallback from "./find/spotify/SpotifyCallback";
import SpotifyClearAuth from "./find/spotify/SpotifyClearAuth";

class App extends React.Component<unknown, unknown> {
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
