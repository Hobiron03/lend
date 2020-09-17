import React, { ReactNode } from 'react';
import AppBar from '../organizations/AppBar/AppBar';
import BottomBar from '../organizations/BottomBar/BottomBar';

interface Props{
	children: ReactNode,
	isNotificationPage?: boolean;
}

/**
 * ページコンポーネントを<Screen></Screen>で囲うと自動でAppBarとBottomBarがつきます
 * @param props props
 */
export default function Screen(props: Props) {
	return (
		<>
			<AppBar isNotificationPage={props.isNotificationPage}/>
				<article className="screen-body">
					{props.children}
				</article>
			<BottomBar/>
		</>
	)
}
