export default class MyBook{
	id: number;
	name: string;
	price: number;
	image: string;
	url: string;
	isLending: boolean;
	isBorrrowing: boolean;

	constructor(id: number, name: string, price: number, image: string, url: string, isLending: boolean, isBorrowing: boolean){
		this.id = id;
		this.name = name;
		this.price = price;
		this.image = image;
		this.url = url;
		this.isLending = isLending;
		this.isBorrrowing = isBorrowing;
	}
}