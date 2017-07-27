import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import '../components/tag-component';
import './article-page.html';

import { Tags } from '../../api/tags/tags';
import { Comments } from '../../api/comments/comments';
import { Articles } from '../../api/articles/articles';

Template.articlePage.helpers({
	article() {
		return Articles.findOne(FlowRouter.getParam('articleId'));
	},
	tag(tagId) {
		return Tags.findOne(tagId);
	},
	commentsCount(articleId) {
		return Comments.find({ article: FlowRouter.getParam('articleId') }).count();
	},
	topLevelComments(articleId) {
		return Comments.find({
			article: FlowRouter.getParam('articleId'),
			$not: {
				$exists: {
					following: 1
				}
			}
		});
	}
});

