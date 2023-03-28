import PropTypes from 'prop-types';
import './styles.scss';

const ActionButton = ({ onClick, classes, children }) => {
	const btnClasses = 'room-btn ' + classes;
	return (
		<button className={btnClasses} onClick={onClick}>
			{children}
		</button>
	);
};

ActionButton.propTypes = {
	onClick: PropTypes.func.isRequired,
	classes: PropTypes.string,
};

ActionButton.defaultProps = {
	classes: 'normal-room-btn',
};

export default ActionButton;
