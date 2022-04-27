const testArr = [ 1, 2, 3, 4, 5 ];

const shift = (steps = 0, arr = [ 1, 2, 3 ]) => {
	let direction = steps;
	if (typeof steps != 'number') return arr;
	if (Math.abs(steps) > arr.length) {
		steps = steps % arr.length;
	}
	direction >= 1 ? arr.unshift(...arr.splice(arr.length - steps, arr.length)) : arr.push(...arr.splice(0, Math.abs(steps)));
	return arr;
};

console.log(shift(1, [ 1, 2, 3 ]));
console.log(shift(-3, testArr));
console.log(shift());
