import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import image1 from '../../assets/p1.png';
import image2 from '../../assets/p2.png';
import image3 from '../../assets/p3.png';
import image4 from '../../assets/p4.png';

// 漫画のページ一覧
const images = [image1, image2, image3, image4];

const Viewer = () => {
	const [page, setPage] = useState(0);

	const handlePageNext = () => {
		if(page != images.length){
			setPage(page => page + 1);
		}
	}

	const handlePageBack = () => {
		if(0 < page){
			setPage(page => page - 1);
		}
	}

	const history = useHistory();
	const handleCloseViewer = () => {
		// 本棚に戻る
		history.push('/mybook');
	}

	return (
		<div className="viewer">
			{
				page < images.length ? (
					<img className="viewer-image" src={images[page]}/>
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
	)
}

export default Viewer;