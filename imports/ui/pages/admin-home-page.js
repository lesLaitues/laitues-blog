import { Template } from 'meteor/templating';
import { sAlert } from 'meteor/juliancwirko:s-alert';

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
			if (err) {
				sAlert.error(err.reason);
				throw err;
			}
			sAlert.success('Votre article a bien été publié.');
		});
	}
});

