import { Meteor } from 'meteor/meteor';

import { Comments } from '../comments';

Meteor.publish('comments', (article) => {
	return Comments.find({ article });
});

