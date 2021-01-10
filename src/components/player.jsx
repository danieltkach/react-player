import React, {useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay, 
	faAngleLeft, 
	faAngleRight,
	faPause,
} from '@fortawesome/free-solid-svg-icons';
import { playAudio, skipForward } from '../utils';

const Player = ({audioRef, currentSong, isPlaying, setIsPlaying, songInfo, setSongInfo, songs, setCurrentSong}) => {
	// useEffect(()=>{

	// })
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
	};

	const skipTrackHandler = async (direction) => {
		let currentIndex = (songs.findIndex((song) => song.id === currentSong.id));

		if (direction === 'skip-forward') {
			// await setCurrentSong(songs[(currentIndex + 1 ) % songs.length]);
			skipForward(songs, currentSong, setCurrentSong, isPlaying, audioRef);
		}
		if (direction === 'skip-back') {
			if (currentIndex === 0) await setCurrentSong(songs[songs.length-1]);
			else await setCurrentSong(songs[currentIndex - 1]);
		}

		playAudio(isPlaying, audioRef);
	}

	const trackAnim = {
		transform: `translateX(${songInfo.animationPercentage}%)`,
	  };

	return (
		<div className="player">
			<div className="time-control">
				<p>{getTime(songInfo.currentTime)}</p>
				<div style={{background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`}} className="track">
					<input 
						min={0} 
						max={songInfo.duration || 0} 
						value={songInfo.currentTime} 
						type="range"
						onChange={dragHandler}
					/><div style={trackAnim} className="animate-track"></div>
				</div>
				<p>
					{
						getTime(songInfo.duration || 0)
					}
				</p>
			</div>
			<div className="play-control">
				<FontAwesomeIcon 
					className="skip-back" 
					size="2x" 
					icon={faAngleLeft} 
					onClick={() => skipTrackHandler('skip-back')}
				/>
				<FontAwesomeIcon 
					onClick={playSongHandler} 
					className="play" 
					size="2x" 
					icon={isPlaying ? faPause : faPlay} 
				/>
				<FontAwesomeIcon 
					className="skip-forward" 
					size="2x" 
					icon={faAngleRight} 
					onClick={() => skipTrackHandler('skip-forward')}
				/>
			</div>
			
		</div>
	)
}

export default Player;