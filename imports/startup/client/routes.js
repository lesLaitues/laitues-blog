import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/layouts/main-layout';
import '../../ui/pages/home-page';

FlowRouter.route('/', {
	name: 'homePage',
	subscriptions: function(params, queryParams) {
		this.register('my', Meteor.subscribe('blogPost', params.postId));
	},
	action: function () {
		BlazeLayout.render('mainLayout', { content: 'homePage' });
	}
});