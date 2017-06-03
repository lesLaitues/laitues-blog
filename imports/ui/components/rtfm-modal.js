import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';

import './rtfm-modal.html'

Template.rtfmModal.onCreated(() => {
	this.state = new ReactiveVar(null);
});

Template.rtfmModal.onRendered(() => {
	$('#rtfm-modal').modal();
});

Template.rtfmModal.helpers({
	isRegestering() {
		return Template.instance().state.get() === 'register';
	},
	isLoggingin() {
		return Template.instance().state.get() === 'login';
	}
});

Template.rtfmModal.events({
	'keypress #user': _.throttle((e, t) => {
		console.log(t);
		if (Meteor.users.findOne({username: e.target.value}) || Meteor.users.findOne({email: e.target.value})) {
			this.state.set('register');
			console.log(this.state.get());
		} else {
			this.state.set('login');
			console.log(this.state.get());
		}
	}, 300)
});