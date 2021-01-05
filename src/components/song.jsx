import React from 'react'


const Song = ({currentSong}) => {
	const {cover, name, artist} = currentSong;
	console.log('cover ', cover);
	return (
		<div className="song-container">
			<img src={cover} alt='song cover'></img>
			{/* <img src={process.env.PUBLIC_URL + "/jpg/LastTears.jpg"} alt="cover"/> */}
			<h2>{name}</h2>
			<h3>{artist}</h3>
		</div>
	)
}

export default Song;