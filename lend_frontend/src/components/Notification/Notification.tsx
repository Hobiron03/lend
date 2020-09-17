import React, { useState, useEffect, useContext } from 'react'
import Screen from "../Screen/Screen";
import axios from 'axios';
import Notification from '../../model/notification';
import NotificationColumn from './NotificationColumn/NotificationColumn';
import AppContext from '../../contexts/AppContexts';

const ENTRY_POINT = process.env.REACT_APP_API_ENTRYPOINT;

const NotificationPage = () => {
	const { state } = useContext(AppContext);
	const [isLoading, setIsLoading] = useState(true);
	const [notifications, setNorifications] = useState<Notification[]>([]);

	useEffect(() => {
		axios.get(ENTRY_POINT + `/notification?user_id=${state.user.id}`).then((res) => {
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
							<NotificationColumn key={notification.created_at.toString()} notification={notification}/>
						)
					)
				}
			</div>
		</Screen>
	)
}


export default NotificationPage;
