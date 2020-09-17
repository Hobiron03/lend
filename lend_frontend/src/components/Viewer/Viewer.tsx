import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Book from '../../model/book';
import CloseIcon from '@material-ui/icons/Close';

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
						<img className="viewer-image" src={images[page]} alt="manga-page"/>
					) : (
						// TODO: yuta-ike 最後に挿入するページ。何表示するか。
						<div className="additional-page">
							<div>購入を促進するページ</div>
							{/* TODO: yuta-ike ボタンのデザイン */}
							<div>
								<button onClick={handleCloseViewer}>ビュワーを閉じる</button>
							</div>
						</div>
					)
				}
				<div className="navigation-next" onClick={handlePageNext}/>
				<div className="navigation-back" onClick={handlePageBack}/>
			</div>
		</>
	)
}

export default Viewer;