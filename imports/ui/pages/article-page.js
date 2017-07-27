import { Template } from 'meteor/templating';

import '../components/tag-component';
import './article-page.html';

import { Tags } from '../../api/tags/tags';
import { Comments } from '../../api/comments/comments';

Template.articlePage.helpers({
	tag(tagId) {
		return Tags.findOne(tagId);
	},
	commentsCount(articleId) {
		return Comments.find({ article: articleId }).count();
	},
	topLevelComments(articleId) {
		return Comments.find({
			article: articleId,
			$not: { $exists: following }
		});
	}
});

