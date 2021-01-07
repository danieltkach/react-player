import React, { useState } from 'react';

import './styles/app.scss';
import Player from './components/player';
import Song from './components/song';
import Library from './components/Library';
import data from './util';

function App() {
	const [songs, setSongs] = useState(data());
	const [currentSong, setCurrentSong] = useState(songs[0]);
	const [isPlaying, setIsPlaying] = useState(false);
	return (
		<div className="App">
			<Song currentSong={currentSong} />
			<Player
				setIsPlaying={setIsPlaying}
				isPlaying={isPlaying}
				currentSong={currentSong}
			/>
			<Library songs={songs} />
		</div>
	);
}

export default App;
