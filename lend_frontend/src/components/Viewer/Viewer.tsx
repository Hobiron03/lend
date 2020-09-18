import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Book from '../../model/book';
import CloseIcon from '@material-ui/icons/Close';
import { BookPurchase } from '../BookPurchase/BookPurchase';
import Button from '../BookCard/Button/Button';

/**
 * bookデータが与えられればビュワー（InnerViewer）を表示
 */

const Viewer = () => {
	const [book, setBook] = useState<Book>();

	const history = useHistory();
	const { state } = useLocation();

	useEffect(() => {
		if (state == null) {
			history.push('/mybook');
		}else{
			setBook((state as { book: Book }).book as Book);
		}
	}, [state, history])

	if(book != null){
		return <InnerViewr book={book}/>;
	}else{
		return <div></div>;
	}
}



const InnerViewr = ({book}: {book: Book}) => {
	const history = useHistory();
	
	const images = book.url;
	const [page, setPage] = useState(0);

	const handlePageNext = () => {
		if(page !== images.length){
			setPage(page => page + 1);
		}
	}

	const handlePageBack = () => {
		if(0 < page){
			setPage(page => page - 1);
		}
	}

	const handleCloseViewer = () => {
		// 本棚に戻る
		history.push('/mybook');
	}

	return (
		<>
			<div className="viewer-header">
				<div>{book.name} ({page + 1}/{images.length + 1})</div>
				<div onClick={handleCloseViewer}>
					<CloseIcon/>
				</div>
			</div>
			<div className="viewer">
				{
					page < images.length ? (
						// マンガページの表示
						<img className="viewer-image" src={images[page]} alt="manga-page"/>
					) : (
						// 最終ページの表示
						book.status === "having" ? (
							// 所持している本
							<div className="additional-page">
								<Button content="閉じる" onClick={handleCloseViewer}/>
							</div>
						) : (
							// 借りている本
							<BookPurchase book={book} onClose={handleCloseViewer}/>
						)
					)
				}
				{ page !== 0 && <div className="navigation-back" onClick={handlePageBack}/> }
				{ page !== images.length && <div className="navigation-next" onClick={handlePageNext}/>}
			</div>
		</>
	)
}

export default Viewer;