import { Meteor } from 'meteor/meteor';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

BlazeLayout.setRoot('body');

Meteor.startup(() => {
	sAlert.config({
		effect: 'slide',
		position: 'top-right'
	});
});