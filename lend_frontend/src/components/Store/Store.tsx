import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import Screen from '../Screen/Screen';
import Book from '../../model/book';
import SearchIcon from '@material-ui/icons/Search';
import BookCard from '../BookCard/BookCard';
import StoreVerticalBookCard from './StoreVerticalBookCard/StoreVerticalBookCard';
import CloseIcon from '@material-ui/icons/Close';
import AppContext from '../../contexts/AppContexts';

const ENTRY_POINT = process.env.REACT_APP_API_ENTRYPOINT;

type StoreMode = "top-page" | "search-page";

const Store = () => {
	const { state } = useContext(AppContext);
	const [rankingBooks, setRankingBooks] = useState<Book[]>([]);
	const [discountBooks, setDiscountBooks] = useState<Book[]>([]);
	const [allBooks, setAllBooks] = useState<Book[]>([]);
	const [sortedBooks, setSortedBooks] = useState<Book[]>([]);
	const [searchText, setSearchText] = useState("");
	const [storeMode, setStoreMode] = useState<StoreMode>("top-page");

	useEffect(() => {
		axios.get(ENTRY_POINT + `/store?user_id=${state.user.id}`).then((res) => {
			console.log(res);
			const books = res.data.map((data: any) => Book.fromJson(data));
			setAllBooks(books);
			setSortedBooks(books);
		});
		axios.get(ENTRY_POINT + `/store/lend?user_id=${state.user.id}`).then((res) => {
			console.log(res);
			const books = res.data.map((data: any) => Book.fromJson(data)).slice(0, 5);
			setRankingBooks(books);
		});
		axios.get(ENTRY_POINT + `/books?user_id=${state.user.id}`).then((res) => {
			console.log(res);
			const books = res.data.map((data: any) => Book.fromJson(data)).filter((book: any) => (book as Book).status === "borrowing");
			setDiscountBooks(books);
		});
	}, [])

	useEffect(() => {
		if (searchText.length === 0) {
			setStoreMode("top-page");
		} else {
			setStoreMode("search-page");
		}
	}, [searchText])

	const handleSearchTextChange = (searchText: string) => {
		setSearchText(searchText);
		setSortedBooks(allBooks.filter(book => book.name.startsWith(searchText)))
	}

	return (
		<Screen>
			<div className="store-page">
				<div className="search-box-outer">
					<input
						type="text"
						className="search-box"
						placeholder="書籍検索"
						onChange={(e) => handleSearchTextChange(e.target.value)}
						value={searchText}
						onSubmit={() => console.log("aa")}
					/>
					{
						searchText.length != 0 ? (
							<CloseIcon onClick={() => setSearchText("")}/>
						) : (
							<SearchIcon/>
						)
					}
				</div>
				{
					storeMode === "top-page" ? (
						<>
							<div className="divider"/>
							<article className="store-page">
								<section>
									<h1 className="upper-title">貸し出し数ランキング TOP5</h1>
									<div className="gallery">
										{
											rankingBooks.map(book =>
												<StoreVerticalBookCard key={book.id} book={book} isDiscounted={book.status === "borrowing"} />
											)
										}
									</div>
								</section>
								{
									discountBooks.length !== 0 && (
										<>
											<div className="divider" />
											<section>
												<h1 className="upper-title">割引中の本</h1>
												<div className="gallery">
													{
														discountBooks.map(book =>
															<StoreVerticalBookCard key={book.id} book={book} isDiscounted={book.status === "borrowing"}/>
														)
													}
												</div>
											</section>
										</>
									)
								}
								<div className="divider" />
								<section>
									<h1 className="upper-title">書籍一覧</h1>
									{
										allBooks.map(book =>
											<BookCard key={book.id} book={book} type="buy"/>
										)
									}
								</section>
							</article>
							<div className="footer-label"/>
						</>
					) : (
						<section>
							<h1 className="upper-title">検索結果 全{sortedBooks.length}件</h1>
							{
								sortedBooks.map(book =>
									<BookCard key={book.id} book={book} type="buy"/>
								)
							}
							<div className="footer-label">検索結果 全{sortedBooks.length}件</div>
						</section>
					)
				}
			</div>
		</Screen>
	)
}

export default Store;