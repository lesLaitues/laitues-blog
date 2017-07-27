import { Meteor } from 'meteor/meteor';

import { Categories } from '../categories';

Meteor.publish('categories', () => {
	return Categories.find({});
});

