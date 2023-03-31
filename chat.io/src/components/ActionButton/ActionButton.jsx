import PropTypes from 'prop-types';
import './styles.scss';

const ActionButton = ({ onClick, classes, disabled, children }) => {
	// Create classes for button
	const btnClasses = 'chat-btn ' + classes;
	return (
		<button className={btnClasses} onClick={onClick} disabled={disabled}>
			{children}
		</button>
	);
};

ActionButton.propTypes = {
	onClick: PropTypes.func.isRequired,
	classes: PropTypes.string,
	disabled: PropTypes.bool,
};

ActionButton.defaultProps = {
	classes: '',
	disabled: false,
};

export default ActionButton;
