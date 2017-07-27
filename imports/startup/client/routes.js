import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/layouts/main-layout';
import '../../ui/pages/home-page';

import '../../ui/layouts/admin-layout';
import '../../ui/pages/admin-home-page';
import '../../ui/pages/rtfm-page';

FlowRouter.route('/', {
	name: 'homePage',
	action() {
		BlazeLayout.render('mainLayout', { content: 'homePage' });
	}
});

FlowRouter.route('/:articleId', {
	name: 'articlePage',
	action() {
		BlazeLayout.render('mainLayout', {  content: 'articlePage'});
	}
});

let adminRoutes = FlowRouter.group({
	prefix: '/admin',
	name: 'admin',
	triggersEnter: [function (context, redirect) {
		console.log('running group triggers');
	}]
});

adminRoutes.route('/', {
	action() {
		BlazeLayout.render('adminLayout', { content: 'adminHomePage' });
	}
});