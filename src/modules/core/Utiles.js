
/**
Search the collection and find an index where

	item.id === collection[index].id

If no index found, then -1 is returned.

 */
export function findIndexById(collection, item) {
	for (var i = 0; i < collection.length; i++) {
		if (collection[i].id === item.id) {
			return i;
		}
	}
	return -1;
}




/*
Remove by filters

Filters and source are collection.
This function remove all items in filters from source where thy have the same 
in property key.

For example:

```javascript
var source = [{id: 1, name: 'test'}];
var filters = [{id: 1, name: 'test 2'}];

differenceBy(source, filters, 'id');
// result is empty array
```

And

```javascript
var source = [{id: 1, name: 'test'}];
var filters = [{id: 1, name: 'test 2'}];

differenceBy(source, filters, 'name');
// result is: [{id: 1, name: 'test'}];
```
 */
export function differenceBy(source, filters, key) {
	_.forEach(filters, function(filter) {
		_.remove(source, function(item) {
			return item[key] === filter[key];
		});
	});
}

/**
Find item in collection

*/
export function findItemFrom(item, collection) {
	item.id = _.toNumber(item.id);
	for (var i = 0; i < collection.length; i++) {
		if (collection[i].id === item.id) {
			return collection[i];
		}
	}
}


/**

This is equal to the following math (set) operation:

```javascript
	result = a ∪ b;
```

 */
export function unionCollection(a, b) {
	// TODO:
}

/**

This is equal to the following math (set) operation:

```javascript
	result = a ∩ b;
```

 */
export function intersectionCollection(a, b) {
	// TODO:
}

/**

This is equal to the following math (set) operation:

```javascript
	result = a - b;
```

 */
export function differenceCollection(a, b) {
	var result = [];
	a.forEach(item => {
		var index = -1;
		b.forEach((target, i) => {
			if (target.id === item.id) {
				index = i
			}
		});
		if (index === -1) {
			result.push(item);
		}
	});
	return result;
}


/**
Search the collection and find an item then remove it where

	item.id === collection[index].id

 */
export function removeItemFromCollection(collection, item) {
	var index = findIndexById(collection, item);
	if (index > -1) {
		collection.splice(index, 1);
	}
	return collection;
}

