import { Meteor } from 'meteor/meteor';

Meteor.methods({
	'users.usernameExists'({ username }) {
		return !!Meteor.users.findOne({ username });
	},
	'users.emailExists'({ email }) {
		return !!Meteor.users.findOne({ 'emails.address': email });
	}
});

