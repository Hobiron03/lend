class Notification{
	message: string;
	created_at: Date;

	constructor(message: string, created_at: Date){
		this.message = message;
		this.created_at = created_at;
	}

	static fromJson(json: any){
		return new Notification(json.message, new Date(json.created_at));
	}
}

export default Notification;