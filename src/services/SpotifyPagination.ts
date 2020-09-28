import SpotifyWebApi from "spotify-web-api-js";

interface Pagination {
    next?: string;
    items: object[];
}

// Thanks to https://github.com/omarryhan
// https://github.com/JMPerez/spotify-web-api-js/issues/18#issuecomment-638771387
export const getAllPages = async <Response extends Pagination>(
    spotifyApi: SpotifyWebApi.SpotifyWebApiJs,
    request: Promise<Response>,
): Promise<Response> => {
    const paginatedResponse = await request;

    let currentResponse = paginatedResponse;

    while (currentResponse.next) {
        currentResponse = await spotifyApi.getGeneric(
            currentResponse.next,
        ) as Response;
        paginatedResponse.items = paginatedResponse.items.concat(currentResponse.items);
    }

    return paginatedResponse;
};
