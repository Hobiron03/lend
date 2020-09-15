import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import StorefrontIcon from '@material-ui/icons/Storefront';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import SettingsIcon from '@material-ui/icons/Settings';
import { useLocation, useHistory } from "react-router-dom";

type TabState = "mybook" | "friend" | "store" | "contents-store" | "settings";

const BottomBar = () => {
	const [tabState, setTabState] = useState<TabState>("mybook");

	const location = useLocation();
	useEffect(() => {
		setTabState(location.pathname.split('/')[1] as TabState)
	}, [location])

	const history = useHistory();
	const onItemClick = (tabState: TabState) => {
		setTabState(tabState);
		history.push(`/${tabState}`);
	}

	return (
		<footer className="bottom-bar">
			<div
				className={classNames("bottom-bar-item", tabState == "mybook" && "bottom-bar-item-selected")}
				onClick={() => onItemClick("mybook")}
			>
				<MenuBookIcon/>
				<div>マイ本棚</div>
			</div>
			<div
				className={classNames("bottom-bar-item", tabState == "friend" && "bottom-bar-item-selected")}
				onClick={() => onItemClick("friend")}
			>
				<PeopleAltIcon />
				<div>ともだち</div>
			</div>
			<div
				className={classNames("bottom-bar-item", tabState == "store" && "bottom-bar-item-selected")}
				onClick={() => onItemClick("store")}
			>
				<StorefrontIcon />
				<div>ストア</div>
			</div>
			<div
				className={classNames("bottom-bar-item", tabState == "contents-store" && "bottom-bar-item-selected")}
				onClick={() => onItemClick("contents-store")}
			>
				<EmojiEventsIcon />
				<div>ポイント交換</div>
			</div>
			<div
				className={classNames("bottom-bar-item", tabState == "settings" && "bottom-bar-item-selected")}
				onClick={() => onItemClick("settings")}
			>
				<SettingsIcon />
				<div>設定</div>
			</div>
		</footer>
	)
}

export default BottomBar;