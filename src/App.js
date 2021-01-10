import React, { useState, useRef } from 'react';

import './styles/app.scss';
import Player from './components/player';
import Song from './components/song';
import Library from './components/Library';
import data from './data';
import Nav from './components/Nav';
import { skipForward } from './utils';


function App() {
	const audioRef = useRef(null);
	const [songs, setSongs] = useState(data());
	const [currentSong, setCurrentSong] = useState(songs[0]);
	const [isPlaying, setIsPlaying] = useState(false);
	const [songInfo, setSongInfo] = useState({
		currentTime: 0,
		duration: 0,
		animationPercentage: 0
	});
	const [libraryStatus, setLibraryStatus] = useState(false);

	const timeUpdateHandler = (e) => {
		const { currentTime: current, duration } = e.target;
		const roundedCurrent = Math.round(current);
		const roundedDuration = Math.round(duration);
		const animation = ((roundedCurrent / roundedDuration) * 100);
		setSongInfo({ ...songInfo, currentTime: current, duration, animationPercentage: animation });
	};

	const songEndHandler = () => {
		skipForward(songs, currentSong, setCurrentSong, isPlaying, audioRef);
	}

	return (
		<div className={`App ${libraryStatus ? 'library-active' : ''}`}>
			<Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
			<Song currentSong={currentSong} isPlaying={isPlaying} />
			<Player
				audioRef={audioRef}
				setIsPlaying={setIsPlaying}
				isPlaying={isPlaying}
				currentSong={currentSong}
				setSongInfo={setSongInfo}
				songInfo={songInfo}
				songs={songs}
				setCurrentSong={setCurrentSong}
			/>
			<Library
				audioRef={audioRef}
				songs={songs}
				setCurrentSong={setCurrentSong}
				currentSong={currentSong}
				isPlaying={isPlaying}
				setSongs={setSongs}
				libraryStatus={libraryStatus}
			/>
			<audio
				onTimeUpdate={timeUpdateHandler}
				onLoadedMetadata={timeUpdateHandler}
				ref={audioRef}
				src={currentSong.audio}
				onEnded={songEndHandler}
			></audio>
		</div>
	);
}

export default App;
