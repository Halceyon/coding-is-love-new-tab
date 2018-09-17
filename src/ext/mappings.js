import _ from 'lodash';
export default {
	nasa:  (items) => {
		return _.map(items, (item) => {
			return {
				title: item.title,
				imageUrl: item.enclosure.url,
				description: item.contentSnippet
			};
		});
	},
};