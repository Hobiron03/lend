import React from 'react';
import Book from '../../../model/book';
import { useHistory } from "react-router-dom";

type Props = {
	book: Book,
};
const StoreVerticalBookCard = ({ book }: Props) => {
	const history = useHistory();
	const handleBuy = () => {
		history.push(`/store/${book.id}`, { book });
	}

	return (
		<div className="store-book-card" onClick={handleBuy}>
			<img src={book.image} height="150" width="120" />
			<div className="title">{book.name}</div>
			<div className="auther">{book.auther}</div>
			<div className="info">{book.info}</div>
		</div>
	)
}

export default StoreVerticalBookCard;