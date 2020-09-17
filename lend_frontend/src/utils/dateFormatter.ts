const format = (date: Date) => {
	return `${date.getFullYear()}年${date.getMonth()}月${date.getDay()}日 ${date.getHours()}時${date.getMinutes()}分`;
}

export default format;