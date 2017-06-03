import { Template } from 'meteor/templating';

import '../components/contentComponent';

import './home-page.html';

Template.homePage.helpers({
	contents: [
		'',
		'',
		'',
		'',
		'',
		'',
		''
	]
});