import React, { useState, useEffect } from 'react';
import axios from "axios";
import Screen from '../Screen/Screen';
import Book from '../../model/book';

const ENTRY_POINT = process.env.REACT_APP_API_ENTRYPOINT;

const Store = () => {
	const [books, setBooks] = useState<Book[]>([]);

	useEffect(() => {
		axios.get(ENTRY_POINT + '/books?user_id=1').then((res) => {
			const books = res.data.map((data: any) => Book.fromJson(data));
			setBooks(books);
		});
	}, [])

	return (
		<Screen>
			<div className="store-page">
				<div className="upper-area">
					{
						books.map(book =>
							<StoreBookCard key={book.id} book={book}/>
						)
					}
				</div>
				<div className="middle-area">

				</div>
				<div className="bottom-area">

				</div>
			</div>
		</Screen>
	)
}

export default Store;

type Props = {
	book: Book,
};
const StoreBookCard = ({ book }: Props) => {
	return (
		<div className="store-book-card">
			<img src={book.image}/>
			<div>{book.name}</div>
			<div>{book.author}</div>
			<div>{book.info}</div>
		</div>
	)
}