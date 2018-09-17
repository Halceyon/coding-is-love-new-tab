import rssParser from 'rss-parser';
/*eslint no-console: ["off"]*/
const p = new rssParser();
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

export default {
	items: [],
	get: () => {
		return p.parseURL(CORS_PROXY + 'https://www.nasa.gov/rss/dyn/lg_image_of_the_day.rss');
	},
};