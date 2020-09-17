import React from 'react';
import Book from '../../../model/book';
import { useHistory } from "react-router-dom";
import BookImage from '../../organizations/BookImage/BookImage';

type Props = {
	book: Book,
	isDiscounted?: boolean,
};
const StoreVerticalBookCard = ({ book, isDiscounted = false }: Props) => {
	const history = useHistory();
	const handleBuy = () => {
		history.push(`/store/${book.id}`, { book });
	}

	return (
		<div className="store-book-card" onClick={handleBuy}>
			<BookImage src={book.image} isDiscount={isDiscounted}/>
			<div className="title">{book.name}</div>
			<div className="auther">{book.auther}</div>
			<div className="info">{book.info}</div>
		</div>
	)
}

export default StoreVerticalBookCard;