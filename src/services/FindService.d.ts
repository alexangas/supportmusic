interface FindService {
  isAuthenticated(): boolean;
  authenticate(): void;
  authenticationCallback(value: string): number;
  clearAuthentication(): void;
  getUserArtistsTop(): Promise<string[]>;
  getUserPlaylists(): Promise<PlaylistReference[]>;
  getPlaylistArtists(id: string): Promise<string[]>;
}
