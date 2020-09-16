import React, { useState, useEffect } from 'react';
import axios from "axios";
import Screen from "../Screen/Screen";
import TabBar from "../organizations/TabBar/TabBar";
import BookCard from "../BookCard/BookCard";
import Book from "../../model/book";

const ENTRY_POINT = process.env.REACT_APP_API_ENTRYPOINT;
type MyBookShellTabState = "available" | "lending";
const initState = "available";

const MyBookList = () => {
	const [mybooks, setMyBooks] = useState<Book[]>([]);
	const [showBooks, setShowBooks] = useState<Book[]>([])
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		axios.get(ENTRY_POINT + '/books?user_id=1').then((res) => {
			const books: Book[] = res.data.map((data: any) => Book.fromJson(data));
			setMyBooks(books);
			if (initState === "available") {
				setShowBooks(books);
			} else {
				setShowBooks(books.filter(({ status }) => status === "lending"));
			}
			setIsLoading(false);
		});
	}, []);

	const handleTabChange = (tabState: MyBookShellTabState) => {
		if(tabState === "available"){
			setShowBooks(mybooks);
		}else{
			setShowBooks(mybooks.filter(({ status }) => status === "lending"));
		}
	}

	return (
		<Screen>
			<TabBar initState={initState} onTabChange={handleTabChange}/>
			<div className="mybooklist-body">
			{
				showBooks.length === 0 ? !isLoading && (
					<div className="empty-message">
						対象の本はありません
					</div>
				):(
					showBooks.map(mybook =>
						<BookCard key={mybook.id} book={mybook}/>
					)
				)
			}
			</div>
		</Screen>
	)
}

export default MyBookList;