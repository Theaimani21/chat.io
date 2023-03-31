import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AngelEmoji from '../../resources/AngelEmoji.png';
import CowboyEmoji from '../../resources/CowboyEmoji.png';
import DizzyEmoji from '../../resources/DizzyEmoji.png';
import DrunkEmoji from '../../resources/DrunkEmoji.png';
import MoneyEmoji from '../../resources/MoneyEmoji.png';
import NerdEmoji from '../../resources/NerdEmoji.png';
import SmirkEmoji from '../../resources/SmirkEmoji.png';
import SunglassesEmoji from '../../resources/SunglassesEmoji.png';
import ThinkingEmoji from '../../resources/ThinkingEmoji.png';
import './styles.scss';

const HomeBox = () => {
	// Get current user from store state
	const currentUser = useSelector((state) => state.chatIo.user);

	// Emoji array
	const emojis = [
		AngelEmoji,
		CowboyEmoji,
		DizzyEmoji,
		DrunkEmoji,
		MoneyEmoji,
		NerdEmoji,
		SmirkEmoji,
		SunglassesEmoji,
		ThinkingEmoji,
	];
	// Get a random index for the first emoji
	const firstIndex = Math.floor(Math.random() * 9);

	// State for current emoji showing
	const [currentEmoji, setCurrentEmoji] = useState(emojis[firstIndex]);

	// State for the emoji index
	const [currentEmojiIndex, setCurrentEmojiIndex] = useState(firstIndex);

	// state for rotating
	const [isRotating, setIsRotating] = useState(false);

	// state for spinner classes
	const [spinnerClasses, setSpinnerClasses] = useState('emoji-img');

	// Swap to next emoji
	const swapEmoji = () => {
		// Get a new random index
		let newIndex = Math.floor(Math.random() * 9);

		// Make sure that it is not the same as the current
		while (newIndex === currentEmojiIndex) {
			// Get a new random index
			newIndex = Math.floor(Math.random() * 9);
		}
		setCurrentEmojiIndex(newIndex);
		setCurrentEmoji(emojis[newIndex]);
	};

	useEffect(() => {
		// Timer interval runns every 0.2 seconds
		const timerInterval = setInterval(() => {
			// If is rotating is true
			if (isRotating) {
				// Set is rotating to false
				setIsRotating(false);
				// Swap current emoji
				swapEmoji();
			} else {
				// Set spinner classes to only emoji img
				setSpinnerClasses('emoji-img');
			}
		}, 200);
		return () => {
			// Reset the timer interval
			clearInterval(timerInterval);
		};
	});

	useEffect(() => {
		// Timer interval runns the amount if seconst prop interval is given
		const timerInterval = setInterval(() => {
			// Add rotate style to spinner classes
			setSpinnerClasses('emoji-img rotate');
			// Set is rotating to true
			setIsRotating(true);
		}, 5 * 1000);
		return () => {
			// Reset the timer interval
			clearInterval(timerInterval);
		};
	});

	return (
		<div className="homebox-container" data-testid="home-box-test">
			<h1 className="homebox-heading">{'Welcome ' + currentUser}</h1>
			<h3>You are online!</h3>
			<div className="spinner-container">
				<span className={'spinner'}>
					<img className={spinnerClasses} src={currentEmoji} alt="Spinning emoji" />
				</span>
			</div>
			<div className="home-content">
				<h3>Start chatting by selecting an active chat room or an online user from the sidebar.</h3>
			</div>
		</div>
	);
};

export default HomeBox;
