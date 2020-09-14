import React, { useState } from 'react';
import classNames from 'classnames';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import StorefrontIcon from '@material-ui/icons/Storefront';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import SettingsIcon from '@material-ui/icons/Settings';

type TabState = "mybookshell" | "friend" | "store" | "point" | "settings";

export const BottomBar = () => {
	const [tabState, setTabState] = useState("mybookshell");

	const onItemClick = (tabState: TabState) => {
		setTabState(tabState);
	}

	return (
		<footer className="bottom-bar">
			<div
				className={classNames("bottom-bar-item", tabState == "mybookshell" && "bottom-bar-item-selected")}
				onClick={() => onItemClick("mybookshell")}
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
				className={classNames("bottom-bar-item", tabState == "point" && "bottom-bar-item-selected")}
				onClick={() => onItemClick("point")}
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
