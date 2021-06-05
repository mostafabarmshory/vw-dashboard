import {
	differenceCollection,
} from './Utiles';
window.debug = false;


var a = [{ id: 0 }];
var b = [{ id: 1 }, { id: 2 }];
var c = [{ id: 0 }, { id: 1 }, { id: 2 }];

describe('Utils ', () => {
	it(' difference collection work well', () => {
		var result = differenceCollection(a, b);
		expect(result.length).toEqual(a.length);
		expect(result).toEqual(a);

		result = differenceCollection(a, a);
		expect(result.length).toEqual(0);

		result = differenceCollection(c, a);
		expect(result.length).toEqual(b.length);
		expect(result).toEqual(b);
	});
})