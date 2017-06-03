import { Meteor } from 'meteor/meteor';

import { Tags } from '../tags';

Meteor.publish('tags', () => {
	return Tags.find({});
});