import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { _ } from 'meteor/underscore';

import { Tags } from '../../api/tags/tags';
import { Contents } from '../../api/contents/contents';

import '../components/tag-component';
import '../components/content-component';
import '../components/rtfm-modal';

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
});

Template.homePage.helpers({
	contents() {
		return Contents.find({});
	},
	otherTags() {
		return Tags.find({
			_id: {
				$not: {
					$in: _.union(Session.get('disallowedTags'), Session.get('allowedTags'))
				}
			}
		});
	},
	allowedTags() {
		return Tags.find({
			_id: {
				$in: Session.get('allowedTags')
			}
		});
	},
	disallowedTags() {
		return Tags.find({
			_id: {
				$in: Session.get('disallowedTags')
			}
		});
	}
});