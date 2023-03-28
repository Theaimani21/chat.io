import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import PropTypes from 'prop-types';

const AlertPopUp = ({ open, close, msg, severity }) => {
	return (
		<Snackbar
			anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			open={open}
			autoHideDuration={8000}
			onClose={close}
			sx={{ width: '90%' }}
			key={'top center'}>
			<Alert severity={severity} open={open} onClose={close} variant="filled">
				{msg}
			</Alert>
		</Snackbar>
	);
};

AlertPopUp.propTypes = {
	open: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired,
	msg: PropTypes.string.isRequired,
	severity: PropTypes.string,
};

AlertPopUp.defaultProps = {
	severity: 'info',
};

export default AlertPopUp;
