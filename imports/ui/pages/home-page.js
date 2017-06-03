import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import { Tags } from '../../api/tags/tags';
import { Contents } from '../../api/contents/contents';

import '../components/tag-component';
import '../components/content-component';

import './home-page.html';

Template.homePage.onCreated(function () {
	Session.set('allowedTags', []);
	Session.set('disallowedTags', []);
	this.autorun(() => {
		this.subscribe('contents', Session.get('allowedTags'), Session.get('disallowedTags'), 10);
		this.subscribe('tags');
	});
});

Template.homePage.onRendered(() => {
	const target = $('#right-sidebar').find('.pushpin');
	target.pushpin({
		top: target.offset().top
	});
});

Template.homePage.helpers({
	contents() {
		return Contents.find({});
	},
	otherTags() {
		return Tags.find({
			_id: {
				
			}
		});
	}
});