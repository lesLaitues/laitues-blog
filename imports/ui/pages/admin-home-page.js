import { Template } from 'meteor/templating';

import './admin-home-page.html';

Template.adminHomePage.events({
	'submit form'(event, instance) {
		event.preventDefault();

		Meteor.call('articles.insert', {
			title: $('#article-title').val(),
			authors: [Meteor.userId()],
			tags: [],
			data: {
				text: $('#article-text').val()
			}
		}, (err, res) => {
			console.error(err);
			console.log(res);
		});
	}
});