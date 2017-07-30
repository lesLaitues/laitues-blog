import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { _ } from 'meteor/underscore';

import './tag-component.html';

Template.tagComponent.helpers({
	isRequired(tagId) {
		return Session.get('requiredTags').includes(tagId);
	},
	isBanned(tagId) {
		return Session.get('bannedTags').includes(tagId);
	}
});

Template.tagComponent.events({
	'click .tag'() {
		let requiredTags = Session.get('requiredTags');
		let bannedTags = Session.get('bannedTags');
		const tagId = this._id;
		if (requiredTags.includes(tagId)) {
			Session.set('requiredTags', _.without(requiredTags, tagId));
			Session.set('bannedTags', _.union(bannedTags, [tagId]));
		} else if (bannedTags.includes(tagId)) {
			Session.set('bannedTags', _.without(bannedTags, tagId));
		} else {
			Session.set('requiredTags', _.union(requiredTags, [tagId]));
		}
	}
});
