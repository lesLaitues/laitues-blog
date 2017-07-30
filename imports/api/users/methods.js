import { Meteor } from 'meteor/meteor';

Meteor.methods({
	'users.exists'({ username, email }) {
		if (username !== undefined) {
			return !!Meteor.users.findOne({ username });
		}

		if (email !== undefined) {
			return !!Meteor.users.findOne({ 'emails.address': email });
		}

		return false;
	}
});

