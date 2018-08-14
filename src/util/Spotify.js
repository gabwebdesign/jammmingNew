let accessToken;
let expiresIn;
const _clientID='56df36dd0fc4479e8939b9322de30e0c';
const _redirect_URI='http://192.168.1.6:3000/';

const Spotify = {

 getAccessToken() {
    if (!accessToken){
      accessToken = window.location.href.match(/access_token=([^&]*)/);
      expiresIn = window.location.href.match(/expires_in=([^&]*)/);

      if(accessToken && expiresIn){
        accessToken = accessToken[1];
        expiresIn = expiresIn[1];
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
      }else{
        window.location.href = "https://accounts.spotify.com/authorize?client_id=" + _clientID + "&response_type=token&scope=playlist-modify-public&redirect_uri=" + _redirect_URI;
      }
    }
    return accessToken
  },

  search(term){
    return fetch('https://api.spotify.com/v1/search?type=track&q=' + term, {headers: {'Authorization': 'Bearer ' + this.getAccessToken()}})
    .then(
      function(response){
        return (response.ok) ? response.json() : [];
      }
    ).then(
      function(jsonResponse){
        if (jsonResponse.tracks){
          let tracksList = jsonResponse.tracks.items.map(
            function(track){
              return{
                id: track.id,
                name: track.name,
                uri: track.uri,
                album: track.album.name,
                artist: track.artists[0].name
              }
            }
          )
          return tracksList;
        }else{
          return [];
        }
      }
    )
  },

}

export default Spotify;