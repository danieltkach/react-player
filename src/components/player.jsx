import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay, 
	faAngleLeft, 
	faAngleRight,
	faPause,
} from '@fortawesome/free-solid-svg-icons';


const Player = ({audioRef, currentSong, isPlaying, setIsPlaying, songInfo, setSongInfo}) => {
	// const {audio, color, id, active} = currentSong;

	// const audioRef = useRef(null);
	
	const playSongHandler = () => {
		if (isPlaying) {
			audioRef.current.pause();
		}else{
			audioRef.current.play();
		}
		setIsPlaying(!isPlaying);
	}

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

	return (
		<div className="player">
			<div className="time-control">
				<p>{getTime(songInfo.currentTime)}</p>
				<input 
					min={0} 
					max={songInfo.duration || 0} 
					value={songInfo.currentTime} 
					type="range"
					onChange={dragHandler}
				/>
				<p>{
					getTime(songInfo.duration || 0)
				}</p>
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
			
		</div>
	)
}

export default Player;