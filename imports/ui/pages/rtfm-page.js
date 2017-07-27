import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';

import './rtfm-page.html';

Template.rtfmPage.onCreated(function rtfmPageOnCreated() {
	this.answer = new ReactiveVar(0);
	this.registering = new ReactiveVar(false);
	this.isEmail = new ReactiveVar(false);
	this.loggingin = new ReactiveVar(false);
	this.btnText = new ReactiveVar('Veuillez remplir le champs ci-dessus');
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
	},
	isRegistering() {
		return Template.instance().registering.get();
	},
	isLoggingin() {
		return Template.instance().loggingin.get();
	},
	isDisabled() {
		return '';
	},
	btnText() {
		return Template.instance().btnText.get();
	},
	inputType() {
		return Template.instance().isEmail.get() ? 'email' : 'text';
	},
	isEmail() {
		return Template.instance().isEmail.get();
	}
});

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

Template.rtfmPage.events({
	'keydown #username-or-email'(event, instance) {
		const uoe = $('#username-or-email').val();
		if (uoe.length === 0) {
			instance.btnText.set('Veuillez remplir le champs ci-dessus');
		} else {
			instance.btnText.set('En attente de la fin de la saisie...');
		}
		instance.loggingin.set(false);
		instance.registering.set(false);
		instance.isEmail.set(false);
	},
	'input #username-or-email': _.debounce((event, instance) => {
		const uoe = $('#username-or-email').val();
		if (uoe.length === 0) {
			instance.btnText.set('Veuillez remplir le champs ci-dessus');
		} else {
			const form = $('#rtfm-form');
			form.fadeIn();
			if (Meteor.users.findOne({ $or: [{ username: uoe }, { 'email.address': uoe }] })) {
				instance.btnText.set('Connexion');
				instance.registering.set(false);
				instance.loggingin.set(true);
			} else {
				instance.btnText.set('Inscription');
				instance.loggingin.set(false);
				instance.registering.set(true);
			}
			instance.isEmail.set(emailRegex.test(uoe));
			Meteor.setTimeout(() => {
				form.fadeOut();
			}, 250);
		}
	}, 250)
});