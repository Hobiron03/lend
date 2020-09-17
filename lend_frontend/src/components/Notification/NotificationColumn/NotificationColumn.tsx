import React from 'react';
import Notification from "../../../model/notification";
import dateFormat from "../../../utils/dateFormatter";

type Props = {
	notification: Notification,
}

const NotificationColumn = ({ notification }: Props) => {
	return (
		<div className="notification-item">
			<div className="notification-body">
				{notification.message}
			</div>
			<div className="notification-date">
				{dateFormat(notification.created_at)}
			</div>
		</div>
	)
}

export default NotificationColumn;