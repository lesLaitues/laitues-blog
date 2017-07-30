import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { _ } from 'meteor/underscore';
import Stickyfill from 'stickyfill';

import { Categories } from '../../api/categories/categories';
import { Tags } from '../../api/tags/tags';
import { Articles } from '../../api/articles/articles';

import '../components/tag-component';
import '../components/article-component';
import '../components/intro-component';

import './feed-page.html';

Template.feedPage.onCreated(function () {
	Session.set('category', undefined);
	Session.set('requiredTags', []);
	Session.set('bannedTags', []);
	this.autorun(() => {
		this.subscribe('articles', Session.get('category'), Session.get('requiredTags'), Session.get('bannedTags'), 10);
		this.subscribe('tags');
	});
});

Template.feedPage.onRendered(() => {
	let stickyfill = Stickyfill();
	for (elt of document.getElementsByClassName('sticky')) {
		stickyfill.add(elt);
		stickyfill.init();
	}
});

Template.feedPage.helpers({
	articles() {
		return Articles.find({});
	},
	otherTags() {
		return Tags.find({
			_id: {
				$not: {
					$in: _.union(Session.get('bannedTags'), Session.get('requiredTags'))
				}
			}
		});
	},
	requiredTags() {
		return Tags.find({
			_id: {
				$in: Session.get('requiredTags')
			}
		});
	},
	bannedTags() {
		return Tags.find({
			_id: {
				$in: Session.get('bannedTags')
			}
		});
	}
});

