type BookStatus = "borrowing" | "having" | "lending";

export default class Book{
	id: number;
	name: string;
	author: string;
	price: number;
	image: string;
	url: string;
	status: BookStatus;

	constructor(id: number, name: string, author: string, price: number, image: string, url: string, status: BookStatus){
		this.id = id;
		this.name = name;
		this.author = author;
		this.price = price;
		this.image = image;
		this.url = url;
		this.status = status;
	}

	static fromJson(json: any){
		return new Book(json.id, json.name, json.author, json.price, json.image, json.url, json.status);
	}
}