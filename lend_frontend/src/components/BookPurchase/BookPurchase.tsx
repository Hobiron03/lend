import React from "react";
import Screen from "../Screen/Screen";
import Book from "../../model/book";

interface Props {
	book: Book;
}

const BookPurchase = ({ book = new Book(1, '桃太郎', '昔の人', '昔話です。有名なお話です。鬼を倒します。', 100, 'xxx', 'xxx', 'having') }: Props) => {
	const handleBuy = () => {
		console.log('購入');
	}
	return (
		<Screen>
			<div className="book-purchase-page">
				<div className="upper-area">
					<div className="book-img">
						<img src={book.image}/>
					</div>
					<section className="book-title">
						<h1>{book.name}</h1>
						<div>{book.auther}</div>
						<div className="book-price"><u>{book.price}円</u></div>
					</section>
				</div>
				<div>
					<div className="purchase-button" onClick={handleBuy}>購入する</div>
				</div>
				<section className="description section">
					<div className="section-header">
						<h1>作品内容</h1>
					</div>
					<p className="section-body">
						{book.info}
					</p>
				</section>
				<section className="book-info section">
					<div className="section-header">
						<h1>書籍情報</h1>
					</div>
					<p className="section-body">
						ジャンル: 少年マンガ<br/>
						出版社: ○▲出版<br />
						掲載誌・レーベル: 週刊XXX
					</p>
				</section>
			</div>
		</Screen>
	)
}

export default BookPurchase;