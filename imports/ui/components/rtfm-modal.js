import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';

import './rtfm-modal.html'

Template.rtfmModal.onCreated(() => {
	this.s = new ReactiveVar(null);
});

Template.rtfmModal.onRendered(() => {
	$('#rtfm-modal').modal();
});

Template.rtfmModal.helpers({
	isRegestering() {
		return Template.instance().s.get() === 'register';
	},
	isLoggingin() {
		return Template.instance().s.get() === 'login';
	}
});

Template.rtfmModal.events({
	'keypress #user': _.throttle((e, t) => {
		if (Meteor.users.findOne({username: e.target.value}) || Meteor.users.findOne({email: e.target.value})) {
			t.s.set('register');
			console.log(t.s.get());
		} else {
			t.s.set('login');
			console.log(t.s.get());
		}
	}, 300)
});