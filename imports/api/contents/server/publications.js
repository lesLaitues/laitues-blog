import { Meteor } from 'meteor/meteor';

import { Contents } from '../contents';

Meteor.publish('contents', (allowedTags, disallowedTags, n) => {
	if (allowedTags.length === 0) {
		return Contents.find({
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
	return Contents.find({
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