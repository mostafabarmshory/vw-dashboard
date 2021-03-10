

export function findIndexById(collection, item) {
	for (var i = 0; i < collection.length; i++) {
		if (collection[i].id === item.id) {
			return i;
		}
	}
	return -1;
}