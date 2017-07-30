import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';

import './rtfm-page.html';

Template.rtfmPage.onCreated(function rtfmPageOnCreated() {
	//reactive vars for form fields
	this.answer = new ReactiveVar(0);
	this.registering = new ReactiveVar(false);
	this.isEmail = new ReactiveVar(false);
	this.loggingin = new ReactiveVar(false);
	this.btnText = new ReactiveVar('Veuillez remplir le champs ci-dessus');
	this.formValid = new ReactiveVar(false);
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
		return !Template.instance().formValid.get();
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

const updateForm = _.debounce((event, instance) => {
	const uoe = $('#username-or-email').val();
	instance.isEmail.set(emailRegex.test(uoe));
	if (uoe.length === 0) {
		instance.btnText.set('Veuillez remplir les champs ci-dessus');
	} else {
		let username = instance.isEmail.get() ? $('#username').val() : $('#username-or-email').val();
		let email = instance.isEmail.get() ? $('#username-or-email').val() : $('#email').val();
		Meteor.call('users.exists', { username, email }, (err, res) => {
			if (err) {
				sAlert.error(err.reason);
				return;
			}

			if (res) {
				//exists, login
				instance.btnText.set('Connexion');
				instance.registering.set(false);
				instance.loggingin.set(true);
				Meteor.setTimeout(() => {
					$('#login-part').slideDown();
				}, 100);
			} else {
				//do not exists, register
				instance.btnText.set('Inscription');
				instance.loggingin.set(false);
				instance.registering.set(true);
				Meteor.setTimeout(() => {
					$('#register-part').slideDown();
				}, 100);
			}
		});
	}
}, 250);

//classes setters for success/warning/danger on form field
function setSuccess(target) {
	target = target.parent('.form-group');
	target.removeClass('has-warning has-danger');
	target.addClass('has-success');
}

function setDanger(target) {
	const val = target.val();
	target = target.parent('.form-group');
	if (val.length > 0 || target.hasClass('has-warning') || target.hasClass('has-danger') || target.hasClass('has-success')) {
		target.removeClass('has-warning has-success');
		target.addClass('has-danger');
	}
}

//check everything in the form is correctly filled
function checkForm(instance) {
	let valid = true;
	const uoe = $('#username-or-email');
	if (uoe.val().length === 0) {
		valid = false;
		setDanger(uoe);
	} else {
		setSuccess(uoe);
	}
	if (instance.registering.get()) {
		if (instance.isEmail.get()) {
			const username = $('#username');
			if (username.val().length === 0) {
				valid = false;
				setDanger(username);
			} else {
				setSuccess(username);
			}
		} else {
			const email = $('#email');
			if (emailRegex.test(email.val())) {
				setSuccess(email);
			} else {
				valid = false;
				setDanger(email);
			}
		}
		const password = $('#password');
		if (password.val().length === 0) {
			valid = false;
			setDanger(password);
		} else {
			setSuccess(password);
		}
		const password2 = $('#password2');
		if (password.val() !== password2.val() || password.val().length === 0) {
			valid = false;
			setDanger(password2);
		} else {
			setSuccess(password2);
		}
	} else if (instance.loggingin.get()) {

	} else {
		valid = false;
	}
	instance.formValid.set(valid);
	return valid;
}

Template.rtfmPage.events({
	'input #username-or-email'(event, instance) {
		checkForm(instance);
		const uoe = $('#username-or-email').val();
		if (uoe.length === 0) {
			instance.btnText.set('Veuillez remplir le champs ci-dessus');
			instance.loggingin.set(false);
			$('#register-part').slideUp(() => {
				instance.registering.set(false);
			});
			instance.isEmail.set(false);
		} else {
			instance.btnText.set('En attente de la fin de la saisie...');
		}
		updateForm(event, instance);
	},
	'input #email,#username,#password,#password2'(event, instance) {
		checkForm(instance);
	},
	'submit form'(event, instance) {
		event.preventDefault();

		if (checkForm(instance)) {
			if (Meteor.user()) {
				Meteor.logout();
			}

			const isEmail = instance.isEmail.get();

			if (instance.registering.get()) {
				Accounts.createUser({
					username: isEmail ? $('#username').val() : $('#username-or-email').val(),
					email: isEmail ? $('#username-or-email').val() : $('#email').val(),
					password: $('#password').val()
				}, (err) => {
					if (err) {
						sAlert.error('Désolé, une erreur est survenue.');
						console.error(err);
					}
				});
			} else if (instance.loggingin.get()){
				Meteor.loginWithPassword($('#username-or-email').val(), $('#password').val(), (err) => {
					if (err) {
						sAlert.error('Désolé, une erreur est survenue.');
						console.log(err);
					} else {
						sAlert.success('Salut ' + Meteor.user().username);
					}
				});
			}
		}
	}
});

