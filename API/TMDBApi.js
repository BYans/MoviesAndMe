// API/TMDBApi.js

const API_TOKEN = "fe68c83fff4589ae95347e62f256add8";

export function getFilmsFromApiWithSearchedText (text, page) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN +
        '&language=fr&query=' + text +  "&page=" + page
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}
export function getImageFromApi (name) {
    return 'https://image.tmdb.org/t/p/w300' + name
}
