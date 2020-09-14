import React from 'react'
import NotificationsIcon from '@material-ui/icons/Notifications';

export const AppBar = () => {
	
	const onClickNotification = (e: React.MouseEvent<HTMLInputElement>) => {
		console.log('通知ページへ遷移');
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
