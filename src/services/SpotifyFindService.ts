import SpotifyWebApi from "spotify-web-api-js";
import * as cookies from "js-cookie";
import queryString from "query-string";

export enum TopArtistsTimeRange {
  ShortTerm = "short_term",
  MediumTerm = "medium_term",
  LongTerm = "long_term",
}

type TopArtistsTimeRangeStrings = keyof typeof TopArtistsTimeRange;

export class SpotifyFindService implements FindService {
  private static instance: SpotifyFindService;
  private spotify: SpotifyWebApi.SpotifyWebApiJs;
  private readonly authStateName: string = "S_AUTH";
  public static readonly minutesAllowedToLogIn = 5;

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

    const redirectUri = `${encodeURIComponent(
      window.location.origin
    )}/spotify/callback`;
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
    cookies.set(this.authStateName, state, {
      expires: new Date(
        Date.now() + SpotifyFindService.minutesAllowedToLogIn * 60 * 1000
      ),
      secure: true,
    });

    window.location.href = `${baseApiUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=token&state=${state}`;
  }

  authenticationCallback(value: string): number {
    const parsedHash = queryString.parse(value);

    const state = parsedHash["state"] as string;
    const recordedState = cookies.get(this.authStateName);
    if (state !== recordedState) {
      throw new Error("Mismatched state parameter");
    }
    cookies.remove(this.authStateName);

    const expiresInSeconds = parseInt(parsedHash["expires_in"] as string, 10);
    const token = parsedHash["access_token"] as string;
    this.spotify.setAccessToken(token);
    return expiresInSeconds;
  }

  clearAuthentication(): void {
    this.spotify.setAccessToken(null);
  }

  async getUserArtistsTop(
    timeRangeKey?: TopArtistsTimeRangeStrings
  ): Promise<string[]> {
    let response;
    try {
      response = await this.spotify.getMyTopArtists({
        limit: 50,
        time_range: TopArtistsTimeRange.ShortTerm,
      });
    } catch (err) {
      this.clearAuthentication();
      throw err;
    }
    return response.items.map((itemResponse) => itemResponse.name);
  }

  async getUserPlaylists(): Promise<PlaylistReference[]> {
    let response;
    try {
      response = await this.spotify.getUserPlaylists(undefined, {
        limit: 50,
      });
    } catch (err) {
      this.clearAuthentication();
      throw err;
    }
    return response.items
      ?.filter((itemResponse) => itemResponse.tracks.total > 0)
      .map((itemResponse) => ({
        name: itemResponse.name,
        id: itemResponse.id,
      }));
  }

  async getPlaylistArtists(id: string): Promise<string[]> {
    let response;
    try {
      response = await this.spotify.getPlaylistTracks(id, {
        fields: "items(added_at,track(artists(name))),offset,total",
        limit: 100,
      });
    } catch (err) {
      this.clearAuthentication();
      throw err;
    }
    // console.log(response);
    const artistSet = new Set<string>();
    response.items.forEach((trackItemResponse) => {
      const track = trackItemResponse?.track as SpotifyApi.TrackObjectSimplified;
      if (track) {
        track.artists.forEach((artist) => {
          if (artist) {
            artistSet.add(artist.name);
          }
        });
      }
    });
    return Array.from(artistSet);
  }
}
