import { Template } from 'meteor/templating';
import { Contents } from '../../api/contents/contents';

import '../components/content-component';

import './home-page.html';

Template.homePage.onCreated(function () {
	this.autorun(() => {
		this.subscribe('contents', [], [], 10);
	});
});

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