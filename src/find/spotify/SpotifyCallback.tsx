import React from 'react';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import { SpotifyFindService } from "../../services/SpotifyFindService";

class SpotifyCallback extends React.Component<RouteComponentProps, unknown> {
    private spotify: SpotifyFindService;

    constructor(props: RouteComponentProps) {
        super(props);
        this.spotify = new SpotifyFindService();
    }

    componentDidMount() {
        if (!window.location.hash) {
            return;
        }
        this.spotify.authenticationCallback(window.location.hash);
        this.props.history.replace('/');
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
