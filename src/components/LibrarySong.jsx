import React from 'react'

//{ currentSong } 
const LibrarySong = ({song, songs, setCurrentSong, id, audioRef, isPlaying}) => {
	const {cover, name, artist} = song;
	
	const songSelectHandler = () => {
		setCurrentSong(song);
		// audioRef.current.play();
		if(isPlaying) {
			const playPromise = audioRef.current.play();
			if(playPromise !== undefined) {
				playPromise.then((audio)=> {
					audioRef.current.play();
				})
			}
		}
	}

	return (
		<div className="library-song" onClick={songSelectHandler}>
			<img src={cover} alt='song cover'></img>
			<div className="song-description">
				<h3>{name}</h3>
				<h4>{artist}</h4>
			</div>
		</div>
	)
}

export default LibrarySong;