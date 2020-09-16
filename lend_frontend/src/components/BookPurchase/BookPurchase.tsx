import React, { useState, useEffect } from "react";
import Screen from "../Screen/Screen";
import Book from "../../model/book";
import { useHistory, useLocation } from "react-router-dom";

const BookPurchase = () => {
	const history = useHistory();
	const { state } = useLocation();
	const [book, setBook] = useState<Book>();

	useEffect(() => {
		if(state == null){
			history.push('/store');
		}else{
			setBook((state as { book: Book }).book as Book);
		}
	}, [])
	
	// TODO: 初期値正しく設定する
	const [havingBook, setHavingBook] = useState(false);

	const handleBuy = () => {
		// TODO: 購入処理
		console.log('購入');
		//購入処理が完了したら
		setHavingBook(true);
	}

	const handleRead = () => {
		history.push(`/mybook/${book?.id}/read`, { book });
	}

	return (
		<Screen>
			<div className="book-purchase-page">
				<div className="upper-area">
					<div className="book-img">
						<img src={book?.image}/>
					</div>
					<section className="book-title">
						<h1>{book?.name}</h1>
						<div>{book?.auther}</div>
						<div className="book-price"><u>{book?.price}円</u></div>
					</section>
				</div>
				<div>
					{
						havingBook ? (
							<div className="read-button action-button" onClick={handleRead}>読む</div>
						):(
							<div className="purchase-button action-button" onClick={handleBuy}>購入する</div>
						)
					}
				</div>
				<section className="description section">
					<div className="section-header">
						<h1>作品内容</h1>
					</div>
					<p className="section-body">
						{book?.info}
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