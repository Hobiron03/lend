import React from 'react';
import Book from '../../../model/book';

type Props = {
	book: Book,
};
const StoreVerticalBookCard = ({ book }: Props) => {

	const handleBuy = () => {
		// TODO: APIコール実装
		console.log('購入');
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