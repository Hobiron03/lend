import React, { useState, useEffect } from 'react'
import Screen from "../Screen/Screen";
import axios from 'axios';
import Notification from '../../model/notification';
import NotificationColumn from './NotificationColumn/NotificationColumn';

const ENTRY_POINT = process.env.REACT_APP_API_ENTRYPOINT;

const NotificationPage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [notifications, setNorifications] = useState<Notification[]>([]);

	useEffect(() => {
		axios.get(ENTRY_POINT + "/notification").then((res) => {
			setNorifications(res.data.map((item: any) => Notification.fromJson(item)));
			setIsLoading(false);
		})
	}, []);

	return (
		<Screen isNotificationPage={true}>
			<div>
				{
					notifications.length === 0 || isLoading ? (
						<div className="empty-notification">{isLoading ? 'Loading...' : '通知はありません'}</div>
					) : (
						notifications.map(notification =>
							<NotificationColumn notification={notification}/>
						)
					)
				}
			</div>
		</Screen>
	)
}


export default NotificationPage;
