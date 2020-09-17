import React from 'react'
import { useHistory } from "react-router-dom";
import NotificationsIcon from '@material-ui/icons/Notifications';
import CloseIcon from '@material-ui/icons/Close';

type Props = {
	isNotificationPage?: boolean,
}

const AppBar = ({ isNotificationPage = false }: Props) => {
	const history = useHistory();
	const onClickNotification = () => {
		if (isNotificationPage){
			history.goBack();
		}else{
			history.push('/notification');
			console.log("back");
		}
	}
	
	return (
		<header className="appBar">
			<p>RENT</p>
			<div className="action-buttons">
				<div className="action-button" onClick={onClickNotification}>
				{
					isNotificationPage ? (
						<CloseIcon />
					) : (
						<NotificationsIcon/>
					)
				}
				</div>
			</div>
		</header>
	)
}

export default AppBar;
