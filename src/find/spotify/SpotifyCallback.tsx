import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { SpotifyFindService } from "../../services/SpotifyFindService";

class SpotifyCallback extends React.Component<RouteComponentProps, unknown> {
  private spotifyFindService: SpotifyFindService;

  constructor(props: RouteComponentProps) {
    super(props);
    this.spotifyFindService = SpotifyFindService.getInstance();
  }

  componentDidMount() {
    // TODO: Handle errors
    if (!window.location.hash) {
      return;
    }
    this.spotifyFindService.authenticationCallback(window.location.hash);
    this.props.history.replace("/");
  }

  render() {
    return (
      <>
        <p>Redirecting back to application...</p>
      </>
    );
  }
}

export default withRouter(SpotifyCallback);
