const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "http://localhost:3000/home";
const clientId = "bb51bd82b6124992a4ee942136a5b357";

const scopes = [
    'user-read-private', 'user-read-email', 'user-read-playback-state', 'user-read-recently-played', 'user-top-read', 'playlist-modify-public', 'playlist-modify-private', 'user-library-modify', 'playlist-read-private', 'user-library-read', 'streaming'
];

export const loginUrl = `${authEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}`;