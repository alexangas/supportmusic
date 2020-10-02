export class TextEntryService {
  private static instance: TextEntryService;

  public static getInstance(): TextEntryService {
    if (!TextEntryService.instance) {
      TextEntryService.instance = new TextEntryService();
    }
    return TextEntryService.instance;
  }

  getCleanedArtists(text: string, separator: string | RegExp): string[] {
    return Array.from(new Set(text
      .split(separator)
      .map((value) => value.replace(/\W*/, "").trim())
      .filter(
        (value, _, result) => value.length > 0 && result.indexOf(value) >= 0
      )));
  }
}
