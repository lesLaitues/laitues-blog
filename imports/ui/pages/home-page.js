import { Template } from 'meteor/templating';

import '../components/content-component';

import './home-page.html';

Template.homePage.onRendered(() => {
	const target = $('#right-sidebar').find('.pushpin');
	target.pushpin({
		top: target.offset().top
	});
});

Template.homePage.helpers({
	contents: [
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		''
	]
});

Template.homePage.events({

});