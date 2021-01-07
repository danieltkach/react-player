import React, {useRef, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay, 
	faAngleLeft, 
	faAngleRight,
	faPause,
} from '@fortawesome/free-solid-svg-icons';


const Player = ({currentSong, isPlaying, setIsPlaying}) => {
	// const {audio, color, id, active} = currentSong;

	const audioRef = useRef(null);
	
	const playSongHandler = () => {
		if (isPlaying) {
			audioRef.current.pause();
		}else{
			audioRef.current.play();
		}
		setIsPlaying(!isPlaying);
	}

	const timeUpdateHandler = (e) => {
		const {currentTime: current, duration} = e.target;
		setSongInfo({...songInfo, currentTime: current, duration});
	};

	const getTime = (time) => {
		return(
			Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
		)
	}

	const dragHandler = (e) => {
		const {value} = e.target;
		audioRef.current.currentTime = value;
		setSongInfo({...songInfo, currentTime: value});
	}

	const [songInfo, setSongInfo] = useState({
		currentTime: 0,
		duration: 0
	});

	return (
		<div className="player">
			<div className="time-control">
				<p>{getTime(songInfo.currentTime)}</p>
				<input 
					min={0} 
					max={songInfo.duration} 
					value={songInfo.currentTime} 
					type="range"
					onChange={dragHandler}
				/>
				<p>{getTime(songInfo.duration)}</p>
			</div>
			<div className="play-control">
				<FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
				<FontAwesomeIcon 
					onClick={playSongHandler} 
					className="play" 
					size="2x" 
					icon={isPlaying ? faPause : faPlay} 
				/>
				<FontAwesomeIcon className="skip-forward" size="2x" icon={faAngleRight} />
			</div>
			<audio 
				onTimeUpdate={timeUpdateHandler} 
				onLoadedMetadata={timeUpdateHandler}
				ref={audioRef} 
				src={currentSong.audio}>
			</audio>
		</div>
	)
}

export default Player;