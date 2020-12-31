import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay, faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';


const Player = () => {
	function handlePlayClick() {
		// var audio = new Audio('https://github.com/danieltkach/react-player/blob/main/public/mp3/Last%20Tears.mp3');
		var audio = new Audio('./mp3/LastTears.mp3');
		audio.play();
	}
	return (
		<div className="player">
			<div className="time-control">
				<p>Start Time</p>
				<input type="range"/>
				<p>End Time</p>
			</div>
			<div className="play-control">
				<FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
				<FontAwesomeIcon onClick={handlePlayClick} className="play" size="2x" icon={faPlay} />
				<FontAwesomeIcon className="skip-forward" size="2x" icon={faAngleRight} />
			</div>
		</div>
	)
}

export default Player;