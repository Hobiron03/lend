import React from 'react'
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useHistory } from "react-router-dom";

const AppBar = () => {
	const history = useHistory();
	const onClickNotification = () => {
		history.push('/notification');
	}
	
	return (
		<header className="appBar">
			<p>RENT</p>
			<div className="action-buttons">
				<div className="action-button" onClick={onClickNotification}>
					<NotificationsIcon/>
				</div>
			</div>
		</header>
	)
}

export default AppBar;
