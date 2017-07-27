import { Meteor } from 'meteor/meteor';

import { Articles } from '../articles';

Meteor.publish('articles', (allowedTags, disallowedTags, n) => {
	if (allowedTags.length === 0) {
		return Articles.find({
			tags: {
				$not: {
					$in: disallowedTags
				}
			}
		}, {
			limit: n,
			sort: {
				createdAt: -1
			}
		});
	}
	return Articles.find({
		tags: {
			$all: allowedTags,
			$not: {
				$in: disallowedTags
			}
		}
	}, {
		limit: n,
		sort: {
			createdAt: -1
		}
	});
});

Meteor.publish('article' (articleId) => {
	return Articles.find({ _id: articleId });
});

