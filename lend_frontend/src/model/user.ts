export default class User{
	id: number;
	icon_image: string;
	name: string;
	point: number;
	friends: User[];

	constructor(id: number, icon_image: string, name: string, point: number, friends: User[]) {
		this.id = id;
		this.icon_image = icon_image;
		this.name = name;
		this.point = point;
		this.friends = friends;
	}
}

