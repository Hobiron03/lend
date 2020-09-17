import React, { useState, useEffect, useContext } from "react";
import Screen from "../Screen/Screen";
import Book from "../../model/book";
import { useHistory, useLocation } from "react-router-dom";
import BaseModal from "@material-ui/core/Modal";
import axios from "axios";
import AppContext from "../../contexts/AppContexts";

const ENTRY_POINT = process.env.REACT_APP_API_ENTRYPOINT;

const BookPurchase = () => {
	const { state } = useContext(AppContext);

	const history = useHistory();
	const { state: locationStatestate } = useLocation();
	const [book, setBook] = useState<Book>();

	useEffect(() => {
		if(locationStatestate == null){
			history.push('/store');
		}else{
			setBook((locationStatestate as { book: Book }).book as Book);
		}
	}, [])

	// TODO: 初期値正しく設定する
	const [havingBook, setHavingBook] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);

	const handleCancel = () => {
		history.push('/store');
	}

	const handleBuy = async () => {
		if(book == null) return;
		// TODO: ユーザIDを正しいものに
		await axios.post(ENTRY_POINT + '/buy', {
			id: state.user.id,
			book_id: book.id,
			point: 0,
		});
		setModalOpen(false);
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
				<div className="button-area">
					{
						havingBook ? (
							<>
								<div className="back-button action-button" onClick={handleCancel}>ストアに戻る</div>
								<div className="read-button action-button" onClick={handleRead}>この書籍を読む</div>
							</>
						):(
							<>
								<div className="back-button action-button" onClick={handleCancel}>キャンセル</div>
								<div className="purchase-button action-button" onClick={() => setModalOpen(true)}>購入する</div>
							</>
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
			<BaseModal
				open={modalOpen}
				onClose={() => setModalOpen(false)}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				<div className="modal_background">
					<div className="purchase-modal-content">
						<div className="modal-title">購入画面</div>
						<div className="modal-body">
							<p className="book-title">{book?.name} ({book?.auther}) を購入します</p>
							<div className="book-price">
								<div>{book?.price}円</div>
							</div>
						</div>
						<div className="button-area">
							<div className="back-button action-button" onClick={() => setModalOpen(false)}>キャンセル</div>
							<div className="purchase-button action-button" onClick={handleBuy}>購入する</div>
						</div>
					</div>
				</div>
			</BaseModal>
		</Screen>
	);
}

export default BookPurchase;