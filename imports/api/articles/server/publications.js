import { Meteor } from 'meteor/meteor';

import { Articles } from '../articles';

Meteor.publish('articles', (category, requiredTags, bannedTags, n) => {
	let filters = {
		tags: {
			$not: {
				$in: bannedTags
			}
		}
	};
	let conditions = {
		limit: n,
		sort: {
			createdAt: -1
		}
	};

	if (!!category) {
		filters.category = category;
	}

	if (requiredTags.length > 0) {
		filters.tags.$all = requiredTags;
	}
	
	return Articles.find(filters, conditions);
});

Meteor.publish('article', (articleId) => {
	return Articles.find({ _id: articleId });
});

