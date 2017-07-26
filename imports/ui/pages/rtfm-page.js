import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './rtfm-page.html';

Template.rtfmPage.onCreated(function rtfmPageOnCreated () {
	this.answer = new ReactiveVar(0);
	const answerInterval = Meteor.setInterval(() => {
		this.answer.set(this.answer.get() + 1);
		if (this.answer.get() === 42) {
			Meteor.clearInterval(answerInterval);
		}
	}, 500);
});
Template.rtfmPage.helpers({
	answer() {
		return Template.instance().answer.get();
	}
});