import SpotifyWebApi from "spotify-web-api-js";
import * as cookies from "js-cookie";
import queryString from "query-string";

export class SpotifyFindService implements FindService {
  private static instance: SpotifyFindService;
  private spotify: SpotifyWebApi.SpotifyWebApiJs;
  private readonly authStateName: string = "S_AUTH";

  constructor() {
    this.spotify = new SpotifyWebApi();
  }

  public static getInstance(): SpotifyFindService {
    if (!SpotifyFindService.instance) {
      SpotifyFindService.instance = new SpotifyFindService();
    }
    return SpotifyFindService.instance;
  }

  isAuthenticated(): boolean {
    const token = this.spotify.getAccessToken();
    return token != null && token !== "";
  }

  authenticate(): void {
    const baseApiUrl = "https://accounts.spotify.com/authorize";
    const clientId = "f3dfad56fac44b20ab4d43bf912c29ce";

    const redirectUri = `${encodeURIComponent(window.location.origin)}/spotify/callback`;
    const scopeArray = [
      "playlist-read-private",
      "playlist-read-collaborative",
      "user-top-read",
      "user-read-recently-played",
    ];
    const scopes = encodeURIComponent(scopeArray.join(" "));

    const stateArray = new Uint32Array(8);
    window.crypto.getRandomValues(stateArray);
    const state = stateArray.join("");
    const minutesAllowedToLogIn = 5;
    cookies.set(this.authStateName, state, {
      expires: new Date(Date.now() + minutesAllowedToLogIn * 60 * 1000),
      secure: true,
    });

    window.location.href = `${baseApiUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=token&state=${state}`;
  }

  authenticationCallback(value: string): void {
    const parsedHash = queryString.parse(value);

    const state = parsedHash["state"] as string;
    const recordedState = cookies.get(this.authStateName);
    if (state !== recordedState) {
      throw new Error("Mismatched state parameter");
    }

    // const expiresInSeconds = parsedHash["expires_in"] as number;

    const token = parsedHash["access_token"] as string;
    this.spotify.setAccessToken(token);
  }

  clearAuthentication(): void {
    this.spotify.setAccessToken(null);
  }

  async getUserArtistsTop(): Promise<string[]> {
    let response;
    try {
      response = await this.spotify.getMyTopArtists();
    } catch (err) {
      this.clearAuthentication();
      throw err;
    }
    return response.items.map((itemResponse) => itemResponse.name);
  }

  async getUserPlaylists(): Promise<PlaylistReference[]> {
    let response;
    try {
      response = await this.spotify.getUserPlaylists();
    } catch (err) {
      this.clearAuthentication();
      throw err;
    }
    return response.items.map((itemResponse) => ({
      name: itemResponse.name,
      id: itemResponse.id,
    }));
  }

  async getPlaylistArtists(id: string): Promise<string[]> {
    let response;
    try {
      response = await this.spotify.getPlaylist(id);
    } catch (err) {
      this.clearAuthentication();
      throw err;
    }
    const artists = response.tracks.items.map((trackItemResponse) => {
      const track = trackItemResponse.track as SpotifyApi.TrackObjectFull;
      // TODO
      //return track.artists.map((artist) => artist.name);
      return track.artists[0].name;
    });
    const artistSet = new Set(artists);
    return Array.from(artistSet);
  }
}
