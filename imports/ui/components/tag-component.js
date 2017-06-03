import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { _ } from 'meteor/underscore';

import './tag-component.html';

Template.tagComponent.helpers({
	isAllowed(tagId) {
		return Session.get('allowedTags').includes(tagId);
	},
	isDisallowed(tagId) {
		return Session.get('disallowedTags').includes(tagId);
	}
});

Template.tagComponent.events({
	'click .tag'() {
		let allowedTags = Session.get('allowedTags');
		let disallowedTags = Session.get('disallowedTags');
		const tagId = this._id;
		if (allowedTags.includes(tagId)) {
			Session.set('allowedTags', _.without(allowedTags, tagId));
			Session.set('disallowedTags', _.union(disallowedTags, [tagId]));
		} else if (disallowedTags.includes(tagId)) {
			Session.set('disallowedTags', _.without(disallowedTags, tagId));
		} else {
			Session.set('allowedTags', _.union(allowedTags, [tagId]));
		}
	}
});