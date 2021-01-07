import React from 'react'

//{ currentSong } 
const LibrarySong = ({song}) => {
	const {cover, name, artist} = song;
	console.log(cover, name, artist);
	return (
		<div className="library-song">
			<img src={cover} alt='song cover'></img>
			<div className="song-description">
				<h3>{name}</h3>
				<h4>{artist}</h4>
			</div>
		</div>
	)
}

export default LibrarySong;