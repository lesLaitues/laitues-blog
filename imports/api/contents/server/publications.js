import { Meteor } from 'meteor/meteor';

import { Contents } from '../contents';

Meteor.publish('contents', (allowedTags, disallowedTags, n) => {
	return Contents.find({
		tags: {
			$all: allowedTags,
			$not: {
				$in: disallowedTags
			}
		}
	}).limit(n);
});