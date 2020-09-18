import React from 'react'

type Props = {
	src: string,
	isDiscount: boolean,
}

export default function BookImage({ src, isDiscount }: Props) {
	return (
		<div className="image-box">
			<img src={src} alt="cover" />
			{
				isDiscount && (
					<div className="discount-badge">
						<div className="discount-lanbel">割引中！</div>
					</div>
				)
			}
		</div>
	)
}
