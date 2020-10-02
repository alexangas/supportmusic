import SpotifyWebApi from "spotify-web-api-js";
import * as cookies from "js-cookie";
import queryString from "query-string";
import {getAllPages} from "./SpotifyPagination";

export enum TopArtistsTimeRange {
  ShortTerm = "short_term",
  MediumTerm = "medium_term",
  LongTerm = "long_term",
}

type TopArtistsTimeRangeStrings = keyof typeof TopArtistsTimeRange;

export class SpotifyFindService implements FindService {
  private static instance: SpotifyFindService;
  private readonly spotify: SpotifyWebApi.SpotifyWebApiJs;
  private readonly authStateName: string = "S_AUTH";
  public static readonly minutesAllowedToLogIn = 3600 / 60;

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
  ): Promise<ArtistReference[]> {
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
    return response.items.map((itemResponse) => ({
      name: itemResponse.name,
      spotifyId: itemResponse.id,
      popularity: itemResponse.popularity
    }));
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
        spotifyId: itemResponse.id,
      }));
  }

  async getPlaylistArtists(id: string): Promise<ArtistReference[]> {
    let response;
    try {
      response = await getAllPages<SpotifyApi.PlaylistTrackResponse>(
        this.spotify,
        this.spotify.getPlaylistTracks(id, {
          fields: "items(track(artists(id,name))),next",
          limit: 100,
        })
      );
    } catch (err) {
      this.clearAuthentication();
      throw err;
    }
    const artistSet = new Set<ArtistReference>();
    response.items.forEach((trackItemResponse) => {
      const track = trackItemResponse?.track as SpotifyApi.TrackObjectSimplified;
      if (track) {
        track.artists.forEach((artist) => {
          if (artist) {
            artistSet.add({
              name: artist.name,
              spotifyId: artist.id,
            });
          }
        });
      }
    });
    return Array.from(artistSet);
  }

  async getArtists(ids: string[]): Promise<ArtistReference[]> {
    let response;
    let artists: ArtistReference[] = [];
    console.log("ids", ids);
    for (let idCount = 0; idCount < ids.length; idCount += 50)
    {
      const idSlice = ids.slice(idCount, idCount + 50);
      console.log("idSlice", idSlice);
      try {
        response = await this.spotify.getArtists(idSlice);
      } catch (err) {
        this.clearAuthentication();
        throw err;
      }
      console.log("getArtists", response);
      artists = artists.concat(response.artists.map((artistResponse) => ({
        name: artistResponse.name,
        spotifyId: artistResponse.id,
        popularity: artistResponse.popularity
      })));
    }
    console.log("artists", JSON.parse(JSON.stringify(artists)));
    return artists;
  }

  async searchArtist(name: string): Promise<ArtistReference> {
    let response;
    try {
      response = await this.spotify.searchArtists(encodeURIComponent(name), {
        limit: 1
      });
    } catch (err) {
      this.clearAuthentication();
      throw err;
    }
    return response.artists.items.map((artistResponse) => ({
      name: artistResponse.name,
      spotifyId: artistResponse.id,
      popularity: artistResponse.popularity
    }))[0];
  }

  async populateMissingArtistDetails(artists: ArtistReference[]): Promise<ArtistReference[]> {
    if (artists.every((artist) => artist.spotifyId !== undefined)) {
      const artistDetailIds = Array.from(new Set(artists
          .map((artist) => artist.spotifyId ?? "")));
      return await this.getArtists(artistDetailIds);
    } else {
      const artistDetailPromise = artists
          .map((artist) => this.searchArtist(artist.name));
      return Promise.all(artistDetailPromise)
          .then((artistDetails) => {
                artistDetails.forEach((artistDetail) => {
                  if (artistDetail) {
                    let updatedArtist = artists.find((artist) => artist.name === artistDetail.name);
                    if (updatedArtist) {
                      updatedArtist.spotifyId = artistDetail.spotifyId;
                      updatedArtist.name = artistDetail.name;
                      updatedArtist.popularity = artistDetail.popularity;
                    }
                  }
                })
            return artistDetails;
              }
          )
    }
  }
}
