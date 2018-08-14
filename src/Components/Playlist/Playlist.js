import React from 'react';
import './Playlist.css';
import TrackList from "../TrackList/TrackList.js";

class Playlist extends React.Component{
	constructor(props){
		super(props);
		this.handleNameChange = this.handleNameChange.bind(this);
	}

	handleNameChange(){
		this.props.onNameChange();
	}

	render(){
	    return(
	      <div className="Playlist">
	        <input defaultValue={this.props.title} onChange={this.handleNameChange}/>
	        <TrackList tracks={this.props.tracks} onRemove={this.props.onRemove} isRemoval={true}/>
	        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
	      </div>
	    )
	}
}

export default Playlist;