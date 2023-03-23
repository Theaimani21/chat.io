import './styles.scss';

const RoomButton = ({ onClick, children, ...props }) => (
	<button className="room-btn" onClick={onClick} {...props}>
		<h5>{children}</h5>
	</button>
);

export default RoomButton;
