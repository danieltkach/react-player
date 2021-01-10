export const playAudio = (isPlaying, audioRef) => {
	if (isPlaying) {
		const playPromise = audioRef.current.play();
		if (playPromise !== undefined) {
			playPromise.then((audio) => {
				audioRef.current.play();
			})
		}
	}
}

export const skipForward = async (songs, currentSong, setCurrentSong, isPlaying, audioRef) => {
	let currentIndex = (songs.findIndex((song) => song.id === currentSong.id));
	await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
	if (isPlaying) audioRef.current.play();
}