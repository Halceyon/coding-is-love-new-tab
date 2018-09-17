import nasa  from '../ext/nasa';
// result.forEach(element => {
// 	element.get();
// });
// // console.log(result);
/* eslint-disable no-console */
/* eslint-disable no-undef */

console.log('background !');
var result = nasa.get().then(feed => {
	console.log(feed);
	chrome.runtime.sendMessage({
		name: 'nasa',
		items: feed.items
	}, function(response) {
		console.log(response);
	});
});
console.log(result);