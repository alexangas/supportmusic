import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { SpotifyFindService } from "../../services/SpotifyFindService";

class SpotifyClearAuth extends React.Component<RouteComponentProps, unknown> {
  private spotifyFindService: SpotifyFindService;

  constructor(props: RouteComponentProps) {
    super(props);
    this.spotifyFindService = SpotifyFindService.getInstance();
  }

  componentDidMount() {
    this.spotifyFindService.clearAuthentication();
    this.props.history.replace("/");
    this.props.location.pathname = "/";
  }

  render() {
    return (
      <>
        <p>Redirecting back to application...</p>
      </>
    );
  }
}

export default withRouter(SpotifyClearAuth);
