import React, { useState, useEffect } from 'react';
import axios from "axios";
import Screen from "../Screen/Screen";
import BookCard from "../BookCard/BookCard";
import Book from "../../model/book";

const ENTRY_POINT = process.env.REACT_APP_API_ENTRYPOINT;

// NOTE: エラーハンドリング
const MyBookList = () => {

	const [mybooks, setMyBooks] = useState<Book[]>([]);

	useEffect(() => {
		axios.get(ENTRY_POINT + '/books?user_id=1').then((res) => {
			const books = res.data.map((data: any) => Book.fromJson(data));
			setMyBooks(books);
			console.log(books);
		});
	}, [])

	return (
		<Screen>
			<div className="mybooklist-body">
			{
				mybooks.map(mybook =>
					<BookCard key={mybook.id} book={mybook}/>
				)
			}
			</div>
		</Screen>
	)
}

export default MyBookList;