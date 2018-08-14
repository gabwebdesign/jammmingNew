import React, { Component } from 'react';
import './App.css';
import SearchResults from '../Components/SearchResults/SearchResults';
import SearchBar from '../Components/SearchBar/SearchBar';
import Playlist from '../Components/Playlist/Playlist';
import Spotify from '../util/Spotify'

class App extends Component {
  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);

    this.state = {
      searchResults: [],
      trackURIs:[],
      playlistName: "New Playlist",
          playlistTracks: [
        { 
          id:'regue',
          name: "Woman",
          artist: "Beatles",
          album: "Fantasy"
        },
        { 
          id:'salserin',
          name: "Woman",
          artist: "Beatles",
          album: "Fantasy"
        },
        { 
          id:'rap',
          name: "Woman",
          artist: "Beatles",
          album: "Fantasy"
        }
      ]      
    };

  }

  search(term){
      Spotify.search(term).then(
        function(response){
          if(term.length > 0){
            this.setState({searchResults: response});
          }else{
            this.setState({searchResults: []});
          }
        }.bind(this)
      )
  }

  updatePlaylistName(name){
    name = this.state.playlistName;
    console.log('update playlistName');
  }

  savePlaylist(){
    console.log('save playlistName');
  }

  addTrack(track){
    let idExists = this.state.playlistTracks.some(function(element) {
      return track.id === element.id;
    });

    if(!idExists){
      let newPlaylistState = this.state.playlistTracks;
      newPlaylistState.push(track);

      this.setState(
        {playlistTracks: newPlaylistState}
      );
     }
  }

  removeTrack(track){
    let newPlaylistState = this.state.playlistTracks;
    let itemToRemove = newPlaylistState.find(function(element) {
      return track.id === element.id;
    });

    let index = newPlaylistState.indexOf(itemToRemove);

    if (index > -1){
      newPlaylistState.splice(index, 1);
      this.setState({playlistTracks: newPlaylistState});
    }
  }

  render() {

    return (
      <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={this.search}/>
        <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
          <Playlist title={this.state.playlistName} tracks={this.state.playlistTracks} onSave={this.savePlaylist} playlistName={this.state.playlistName} onRemove={this.removeTrack} onClick={this.removeTrack} playlistTracks={this.state.playlistTracks} onNameChange={this.updatePlaylistName}/>
        </div>
      </div>
    </div>
    );
  }

}

export default App;
