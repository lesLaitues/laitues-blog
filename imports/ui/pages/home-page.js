import { Template } from 'meteor/templating';
import { Contents } from '../../api/contents/contents';

import '../components/content-component';

import './home-page.html';

Template.homePage.onCreated(function () {
	this.autorun(() => {
		this.subscribe('contents', [], ["aiueaie"], 10);
		console.log('salut');
	});
});

Template.homePage.onRendered(() => {
	const target = $('#right-sidebar').find('.pushpin');
	target.pushpin({
		top: target.offset().top
	});
});

Template.homePage.helpers({
	contents() {
		return Contents.find({});
	}
});

Template.homePage.events({

});