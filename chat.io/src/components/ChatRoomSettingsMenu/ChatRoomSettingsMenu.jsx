import React, { useState, useRef } from 'react';
import {
	Button,
	MenuItem,
	Grow,
	ClickAwayListener,
	Paper,
	Popper,
	MenuList,
	Divider,
} from '@mui/material';
import { MdSettings } from 'react-icons/md';
import './styles.scss';
// import KickUserDialog from '../KickUserDialog/KickUserDialog';
// import AddOpDialog from '../AddOpDialog/AddOpDialog';
// import BanUserDialog from '../BanUserDialog/BanUserDialog';
import SettingsDialog from '../SettingsDialog/SettingsDialog';

const ChatRoomSettingsMenu = () => {
	const anchorRef = useRef(null);

	// Menu dropdown state
	const [menuOpen, setMenuOpen] = useState(false);

	// Kick user selection dialog state
	const [kickUserDialog, setKickUserDialog] = useState(false);

	// Add op dialog state
	const [addOpDialog, setAddOpDialog] = useState(false);

	// Ban user dialog state
	const [banUserDialog, setBanUserDialog] = useState(false);

	const handleClick = () => {
		setMenuOpen(true);
	};
	const handleClose = () => {
		setMenuOpen(false);
	};

	return (
		<div>
			<Button
				ref={anchorRef}
				id="composition-button"
				aria-controls={menuOpen ? 'composition-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={menuOpen}
				onClick={() => handleClick()}
				>
				<MdSettings className='settings-icon'/>
			</Button>
			<Popper
				open={menuOpen}
				anchorEl={anchorRef.current}
				role={undefined}
				placement="bottom-start"
				transition
				disablePortal
				className='setting-dropdown'>
				{({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						style={{
							transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
						}}>
						<Paper>
							<ClickAwayListener onClickAway={() => handleClose()}>
								<MenuList
									autoFocusItem={menuOpen}
									id="composition-menu"
									aria-labelledby="composition-button"
									// onKeyDown={handleListKeyDown}
								>
									{/* <MenuItem onClick={() => handleClose()}>Change topic</MenuItem> */}
									{/* <Divider /> */}
									<MenuItem
										onClick={() => {
											handleClose();
											setKickUserDialog(true);
										}}>
										Kick user
									</MenuItem>
									<MenuItem
										onClick={() => {
											handleClose();
											setBanUserDialog(true);
										}}>
										Ban user
									</MenuItem>
									{/* <MenuItem onClick={() => handleClose()}>Unban user</MenuItem> */}
									<Divider />
									<MenuItem
										onClick={() => {
											handleClose();
											setAddOpDialog(true);
										}}>
										Add op
									</MenuItem>
									{/* <MenuItem onClick={() => handleClose()}>Remove op</MenuItem> */}
									{/* <Divider /> */}
									{/* <MenuItem onClick={() => handleClose()}>Edit password</MenuItem> */}
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
			<SettingsDialog open={addOpDialog} close={() => setAddOpDialog(false)} action="op" />
			<SettingsDialog open={kickUserDialog} close={() => setKickUserDialog(false)} action="kick" />
			<SettingsDialog open={banUserDialog} close={() => setBanUserDialog(false)} action="ban" />
			{/* <KickUserDialog open={kickUserDialog} close={() => setKickUserDialog(false)} />
			<AddOpDialog open={addOpDialog} close={() => setAddOpDialog(false)} />
			<BanUserDialog open={banUserDialog} close={() => setBanUserDialog(false)} /> */}
		</div>
	);
};

export default ChatRoomSettingsMenu;
