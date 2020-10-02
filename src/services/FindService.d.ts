interface FindService {
  isAuthenticated(): boolean;
  authenticate(): void;
  authenticationCallback(value: string): number;
  clearAuthentication(): void;
  getUserArtistsTop(): Promise<ArtistReference[]>;
  getUserPlaylists(): Promise<PlaylistReference[]>;
  getPlaylistArtists(id: string): Promise<ArtistReference[]>;
  getArtists(ids: string[]): Promise<ArtistReference[]>;
  searchArtist(name: string): Promise<ArtistReference>;
  populateMissingArtistDetails(
    artists: ArtistReference[]
  ): Promise<ArtistReference[]>;
}
