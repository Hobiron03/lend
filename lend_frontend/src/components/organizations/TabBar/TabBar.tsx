import React, { useState } from 'react'
import classNames from 'classnames';
import BlockIcon from '@material-ui/icons/Block';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';

type MyBookShellTabState = "available" | "lending";

export const TabBar = () => {
	const [tabState, setTabState] = useState<MyBookShellTabState>("available");
	
	const onItemClick = (tabState: MyBookShellTabState) => {
		setTabState(tabState);
		console.log(`タブ遷移: ${tabState}`);
	}

	return (
		<div className="tabBar">
			<div
				className={classNames("tabBar-item", tabState === "available" && "tabBar-item-selected")}
				onClick={() => onItemClick("available")}
			>
				<DoneOutlineIcon className="tabBar-item-icon"/>
				<div>今読める本</div>
			</div>
			<div
				className={classNames("tabBar-item", tabState === "lending" && "tabBar-item-selected")}
				onClick={() => onItemClick("lending")}
			>
				<BlockIcon className="tabBar-item-icon"/>
				<div>貸し出し中の本</div>
			</div>
		</div>
	);
}
