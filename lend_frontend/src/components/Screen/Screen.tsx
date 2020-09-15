import React, { ReactNode } from 'react';
import AppBar from '../organizations/AppBar/AppBar';
import BottomBar from '../organizations/BottomBar/BottomBar';

interface Props{
	children: ReactNode
}

/**
 * ページコンポーネントを<Screen></Screen>で囲うと自動でAppBarとBottomBarがつきます
 * @param props props
 */
export default function Screen(props: Props) {
	return (
		<>
			<AppBar/>
				<article className="screen-body">
					{props.children}
				</article>
			<BottomBar/>
		</>
	)
}
