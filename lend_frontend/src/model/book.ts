type BookStatus = "borrowing" | "having" | "lending";

export default class Book{
	id: number;
	name: string;
	auther: string;
	info: string;
	price: number;
	image: string;
	url: string;
	status: BookStatus;

	constructor(id: number, name: string, auther: string, info: string, price: number, image: string, url: string, status: BookStatus){
		this.id = id;
		this.name = name;
		this.auther = auther;
		this.info = info;
		this.price = price;
		this.image = image;
		this.url = url;
		this.status = status;
	}

	static fromJson(json: any){
		return new Book(json.id, json.name, json.auther, json.info, json.price, json.image, json.url, json.status);
	}
}