import React, { useState } from 'react'
import classNames from 'classnames';
import BlockIcon from '@material-ui/icons/Block';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';

type MyBookShellTabState = "available" | "lending";

type Props = {
	initState: MyBookShellTabState,
	onTabChange: (tabState: MyBookShellTabState) => void,
};

const TabBar = ({ initState, onTabChange }: Props) => {
	const [tabState, setTabState] = useState<MyBookShellTabState>(initState);
	
	const onItemClick = (tabState: MyBookShellTabState) => {
		setTabState(tabState);
		onTabChange(tabState);
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

export default TabBar;